/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

import { observer } from "mobx-react";
import { useParams } from "next/navigation";
import useSWR from "swr";
// plane imports
import { ISSUE_DISPLAY_FILTERS_BY_PAGE } from "@plane/constants";
import { EIssueLayoutTypes, EIssuesStoreType } from "@plane/types";
// components
import { PageHead } from "@/components/core/page-title";
import { WorkspaceCalendarLayout } from "@/components/issues/issue-layouts/calendar/roots/workspace-root";
import { IssuePeekOverview } from "@/components/issues/peek-overview";
import { WorkspaceLevelWorkItemFiltersHOC } from "@/components/work-item-filters/filters-hoc/workspace-level";
import { WorkItemFiltersRow } from "@/components/work-item-filters/filters-row";
// hooks
import { useIssues } from "@/hooks/store/use-issues";
import { useWorkspace } from "@/hooks/store/use-workspace";
import { IssuesStoreContext } from "@/hooks/use-issue-layout-store";
import { useWorkspaceIssueProperties } from "@/hooks/use-workspace-issue-properties";

const CALENDAR_VIEW_ID = "all-issues";

function WorkspaceCalendarPage() {
  // router
  const { workspaceSlug: routerWorkspaceSlug } = useParams();
  const workspaceSlug = routerWorkspaceSlug ? routerWorkspaceSlug.toString() : undefined;
  // store hooks
  const { currentWorkspace } = useWorkspace();
  const {
    issuesFilter: { filters, fetchFilters, updateFilterExpression },
  } = useIssues(EIssuesStoreType.GLOBAL);

  useWorkspaceIssueProperties(workspaceSlug);

  useSWR(
    workspaceSlug ? `WORKSPACE_GLOBAL_CALENDAR_FILTERS_${workspaceSlug}` : null,
    async () => {
      if (workspaceSlug) {
        await fetchFilters(workspaceSlug, CALENDAR_VIEW_ID);
      }
    },
    { revalidateIfStale: false, revalidateOnFocus: false }
  );

  const workItemFilters = filters?.[CALENDAR_VIEW_ID];
  const pageTitle = currentWorkspace?.name ? `${currentWorkspace?.name} - Calendar` : undefined;

  if (!workspaceSlug) return null;

  return (
    <>
      <PageHead title={pageTitle} />
      <IssuesStoreContext.Provider value={EIssuesStoreType.GLOBAL}>
        <WorkspaceLevelWorkItemFiltersHOC
          entityId={CALENDAR_VIEW_ID}
          entityType={EIssuesStoreType.GLOBAL}
          filtersToShowByLayout={ISSUE_DISPLAY_FILTERS_BY_PAGE.my_issues.filters}
          initialWorkItemFilters={{
            displayFilters: {
              ...workItemFilters?.displayFilters,
              layout: EIssueLayoutTypes.CALENDAR,
            },
            displayProperties: workItemFilters?.displayProperties,
            kanbanFilters: workItemFilters?.kanbanFilters,
            richFilters: {},
          }}
          updateFilters={updateFilterExpression.bind(updateFilterExpression, workspaceSlug, CALENDAR_VIEW_ID)}
          workspaceSlug={workspaceSlug}
        >
          {({ filter: globalWorkItemsFilter }) => (
            <div className="h-full overflow-hidden bg-surface-1">
              <div className="flex h-full w-full flex-col border-b border-strong">
                {globalWorkItemsFilter && <WorkItemFiltersRow filter={globalWorkItemsFilter} />}
                <div className="flex-1 overflow-hidden">
                  <WorkspaceCalendarLayout viewId={CALENDAR_VIEW_ID} />
                </div>
              </div>
              <IssuePeekOverview />
            </div>
          )}
        </WorkspaceLevelWorkItemFiltersHOC>
      </IssuesStoreContext.Provider>
    </>
  );
}

export default observer(WorkspaceCalendarPage);
