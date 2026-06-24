import React from "react";
import { AuthRoot } from "@/components/account/auth-forms/auth-root";
import type { EAuthModes } from "@/helpers/authentication.helper";

type AuthBaseProps = {
  authType: EAuthModes;
};

export function AuthBase({ authType }: AuthBaseProps) {
  return (
    <div className="auth-page-container font-sans relative flex min-h-screen w-screen flex-row overflow-hidden bg-white text-black">
      {/* Left side panel: 50% width, fully centered form */}
      <div className="relative z-10 flex h-screen w-full flex-col items-center justify-center p-10 lg:w-[50%]">
        <div className="flex w-full max-w-[440px] flex-col gap-6">
          <AuthRoot authMode={authType} />
        </div>
      </div>

      {/* Right side banner panel: 50% width */}
      <div className="relative hidden h-screen p-6 select-none lg:block lg:w-[50%]">
        {/* Background image layer — regular rounded rectangle */}
        <div
          className="absolute inset-6 rounded-[24px] bg-cover bg-center"
          style={{
            backgroundImage: "url('/auth-bg.png')",
          }}
        />

        {/* Card positioning layer — same dimensions as background layer for coordinate alignment */}
        <div className="pointer-events-none absolute inset-6 z-10">
          {/* Glassmorphic card */}
          <div
            className="pointer-events-auto absolute grid grid-cols-4 grid-rows-2 gap-4 border border-[rgba(164,164,164,0.66)] bg-[rgba(38,38,38,0.15)] p-8 backdrop-blur-[24.65px]"
            style={{
              bottom: "24px",
              left: "24px",
              right: "24px",
              borderRadius: "24px",
            }}
          >
            <h2 className="col-span-3 row-start-1 text-[24px] leading-[110%] font-semibold tracking-[-0.02em] text-white lg:text-[28px]">
              Donde el trabajo fluye y la semana se resuelve.
            </h2>
            <span className="col-start-4 row-start-2 self-end justify-self-end text-[15px] leading-[104.73%] font-medium tracking-[-0.04em] whitespace-nowrap text-[#E4D4D4]">
              FRIDAY WORK OS.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
