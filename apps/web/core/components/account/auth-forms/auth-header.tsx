/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

import { observer } from "mobx-react";
import useSWR from "swr";
import { useTranslation } from "@plane/i18n";
import type { IWorkspaceMemberInvitation } from "@plane/types";
// components
import { LogoSpinner } from "@/components/common/logo-spinner";
import { WorkspaceLogo } from "@/components/workspace/logo";
// helpers
import { EAuthModes, EAuthSteps } from "@/helpers/authentication.helper";
// services
import { WorkspaceService } from "@/services/workspace.service";

type TAuthHeader = {
  workspaceSlug: string | undefined;
  invitationId: string | undefined;
  invitationEmail: string | undefined;
  authMode: EAuthModes;
  currentAuthStep: EAuthSteps;
};

const Titles = {
  [EAuthModes.SIGN_IN]: {
    [EAuthSteps.EMAIL]: {
      header: "Registra tu cuenta.",
      subHeader: "Para acceder a la administración de tus proyectos.",
    },
    [EAuthSteps.PASSWORD]: {
      header: "Registra tu cuenta.",
      subHeader: "Para acceder a la administración de tus proyectos.",
    },
    [EAuthSteps.UNIQUE_CODE]: {
      header: "Registra tu cuenta.",
      subHeader: "Para acceder a la administración de tus proyectos.",
    },
  },
  [EAuthModes.SIGN_UP]: {
    [EAuthSteps.EMAIL]: {
      header: "Registra tu cuenta.",
      subHeader: "Para acceder a la administración de tus proyectos.",
    },
    [EAuthSteps.PASSWORD]: {
      header: "Registra tu cuenta.",
      subHeader: "Para acceder a la administración de tus proyectos.",
    },
    [EAuthSteps.UNIQUE_CODE]: {
      header: "Registra tu cuenta.",
      subHeader: "Para acceder a la administración de tus proyectos.",
    },
  },
};

const workSpaceService = new WorkspaceService();

export const AuthHeader = observer(function AuthHeader(props: TAuthHeader) {
  const { workspaceSlug, invitationId, invitationEmail, authMode, currentAuthStep } = props;
  // plane imports
  const { t } = useTranslation();

  const { data: invitation, isLoading } = useSWR(
    workspaceSlug && invitationId ? `WORKSPACE_INVITATION_${workspaceSlug}_${invitationId}` : null,
    async () => workspaceSlug && invitationId && workSpaceService.getWorkspaceInvitation(workspaceSlug, invitationId),
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );

  const getHeaderSubHeader = (
    step: EAuthSteps,
    mode: EAuthModes,
    workspaceInvitation: IWorkspaceMemberInvitation | undefined,
    email: string | undefined
  ) => {
    if (workspaceInvitation && email && workspaceInvitation.email === email && workspaceInvitation.workspace) {
      const workspace = workspaceInvitation.workspace;
      return {
        header: (
          <div className="relative inline-flex items-center gap-2">
            {t("common.join")}{" "}
            <WorkspaceLogo logo={workspace?.logo_url} name={workspace?.name} classNames="size-9 flex-shrink-0" />{" "}
            {workspace.name}
          </div>
        ),
        subHeader:
          mode == EAuthModes.SIGN_UP
            ? "Create an account to start managing work with your team."
            : "Log in to start managing work with your team.",
      };
    }

    return Titles[mode][step];
  };

  const { header, subHeader } = getHeaderSubHeader(currentAuthStep, authMode, invitation || undefined, invitationEmail);

  if (isLoading)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <LogoSpinner />
      </div>
    );

  return <AuthHeaderBase subHeader={subHeader} header={header} />;
});

type TAuthHeaderBase = {
  header: React.ReactNode;
  subHeader: string;
};

export function AuthHeaderBase(props: TAuthHeaderBase) {
  return (
    <div className="font-sans flex flex-col gap-2 select-none">
      {/* Friday logo above the header title */}
      <div
        className="mb-6 flex flex-col items-end self-start select-none"
        style={{ width: "61.65px", height: "37.91px" }}
      >
        <div
          className="rounded-full"
          style={{
            width: "14.4px",
            height: "14.4px",
            background: "linear-gradient(213.83deg, #FC9050 15.79%, #EB5E69 81.54%)",
          }}
        />
        <span className="text-[24px] leading-none font-bold tracking-tight text-black" style={{ marginTop: "-2px" }}>
          friday
        </span>
      </div>

      <h1 className="text-[40px] leading-[104.73%] font-bold tracking-[-0.04em] text-black">{props.header}</h1>
      <p className="text-[14px] leading-[104.73%] font-medium tracking-[-0.04em] text-[#9B9695]">{props.subHeader}</p>
    </div>
  );
}
