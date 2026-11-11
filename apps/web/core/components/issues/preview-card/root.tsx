/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

import { observer } from "mobx-react";
// plane imports
import { useTranslation } from "@plane/i18n";
import { PriorityIcon, StateGroupIcon } from "@plane/propel/icons";
import type { TIssue, TStateGroups } from "@plane/types";
// hooks
import { useModule } from "@/hooks/store/use-module";
import { useProject } from "@/hooks/store/use-project";
import { useProjectState } from "@/hooks/store/use-project-state";
// plane web imports
import { IssueIdentifier } from "@/plane-web/components/issues/issue-details/issue-identifier";
// local imports
import { WorkItemPreviewCardDate } from "./date";

type Props = {
  projectId: string;
  stateDetails: {
    group?: TStateGroups;
    id?: string;
    name?: string;
  };
  workItem: Pick<TIssue, "id" | "name" | "sequence_id" | "priority" | "start_date" | "target_date" | "type_id"> &
    Partial<Pick<TIssue, "module_ids">>;
};

export const WorkItemPreviewCard = observer(function WorkItemPreviewCard(props: Props) {
  const { projectId, stateDetails, workItem } = props;
  const { t } = useTranslation();
  // store hooks
  const { getProjectIdentifierById, getProjectById } = useProject();
  const { getStateById } = useProjectState();
  const { getModuleById } = useModule();
  // derived values
  const project = getProjectById(projectId);
  const projectIdentifier = getProjectIdentifierById(projectId);
  const projectName = project?.name || projectIdentifier;

  const fallbackStateDetails = stateDetails.id ? getStateById(stateDetails.id) : undefined;
  const stateGroup = stateDetails?.group ?? fallbackStateDetails?.group ?? "backlog";
  const stateName = stateDetails?.name ?? fallbackStateDetails?.name;

  const moduleIds = workItem?.module_ids;
  const moduleNames =
    Array.isArray(moduleIds) && moduleIds.length > 0
      ? moduleIds
          .map((mId) => getModuleById(mId)?.name)
          .filter(Boolean)
          .join(", ")
      : undefined;

  return (
    <div className="max-w-sm min-w-72 space-y-2 rounded-lg border-[0.5px] border-strong bg-surface-1 p-3 shadow-raised-200">
      <div className="flex items-center justify-between gap-2 text-secondary">
        <div className="flex min-w-0 items-center gap-1.5 truncate text-11">
          <IssueIdentifier
            size="xs"
            variant="secondary"
            projectId={projectId}
            projectIdentifier={projectIdentifier}
            issueSequenceId={workItem.sequence_id}
            issueTypeId={workItem.type_id}
          />
          <span className="text-placeholder">-</span>
          <span className={`truncate ${moduleNames ? "text-secondary" : "text-tertiary"}`}>
            {moduleNames || t("module.no_module")}
          </span>
          {projectName && (
            <>
              <span className="text-placeholder">-</span>
              <span className="truncate text-secondary">{projectName}</span>
            </>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <StateGroupIcon stateGroup={stateGroup} className="size-3 shrink-0" />
          <p className="text-11 font-medium">{stateName}</p>
        </div>
      </div>
      <div>
        <h6 className="text-13 font-medium wrap-break-word text-primary">{workItem.name}</h6>
      </div>
      <div className="flex h-5 items-center gap-1">
        <PriorityIcon priority={workItem.priority} withContainer />
        <WorkItemPreviewCardDate
          startDate={workItem.start_date}
          stateGroup={stateGroup}
          targetDate={workItem.target_date}
        />
      </div>
    </div>
  );
});
