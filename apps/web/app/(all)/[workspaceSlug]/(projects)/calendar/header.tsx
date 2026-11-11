/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

import { observer } from "mobx-react";
// plane imports
import { useTranslation } from "@plane/i18n";
import { CalendarLayoutIcon } from "@plane/propel/icons";
import { EIssuesStoreType } from "@plane/types";
import { Breadcrumbs, Header } from "@plane/ui";
// components
import { BreadcrumbLink } from "@/components/common/breadcrumb-link";
import { WorkItemFiltersToggle } from "@/components/work-item-filters/filters-toggle";

export const WorkspaceCalendarHeader = observer(function WorkspaceCalendarHeader() {
  const { t } = useTranslation();

  return (
    <Header>
      <Header.LeftItem>
        <Breadcrumbs>
          <Breadcrumbs.Item
            component={
              <BreadcrumbLink
                label={t("calendar")}
                icon={<CalendarLayoutIcon className="h-4 w-4 text-tertiary" />}
              />
            }
          />
        </Breadcrumbs>
      </Header.LeftItem>
      <Header.RightItem className="items-center">
        <WorkItemFiltersToggle entityType={EIssuesStoreType.GLOBAL} entityId="all-issues" />
      </Header.RightItem>
    </Header>
  );
});
