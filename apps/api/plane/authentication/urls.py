# Copyright (c) 2023-present Plane Software, Inc. and contributors
# SPDX-License-Identifier: AGPL-3.0-only
# See the LICENSE file for details.

from django.urls import path
from django.views.decorators.csrf import csrf_exempt

from .views import (
    CSRFTokenEndpoint,
    ForgotPasswordEndpoint,
    SetUserPasswordEndpoint,
    ResetPasswordEndpoint,
    ChangePasswordEndpoint,
    # App
    EmailCheckEndpoint,
    GitLabCallbackEndpoint,
    GitLabOauthInitiateEndpoint,
    GitHubCallbackEndpoint,
    GitHubOauthInitiateEndpoint,
    GoogleCallbackEndpoint,
    GoogleOauthInitiateEndpoint,
    MagicGenerateEndpoint,
    MagicSignInEndpoint,
    MagicSignUpEndpoint,
    SignInAuthEndpoint,
    SignOutAuthEndpoint,
    SignUpAuthEndpoint,
    ForgotPasswordSpaceEndpoint,
    ResetPasswordSpaceEndpoint,
    # Space
    EmailCheckSpaceEndpoint,
    GitLabCallbackSpaceEndpoint,
    GitLabOauthInitiateSpaceEndpoint,
    GitHubCallbackSpaceEndpoint,
    GitHubOauthInitiateSpaceEndpoint,
    GoogleCallbackSpaceEndpoint,
    GoogleOauthInitiateSpaceEndpoint,
    MagicGenerateSpaceEndpoint,
    MagicSignInSpaceEndpoint,
    MagicSignUpSpaceEndpoint,
    SignInAuthSpaceEndpoint,
    SignUpAuthSpaceEndpoint,
    SignOutAuthSpaceEndpoint,
    GiteaCallbackEndpoint,
    GiteaOauthInitiateEndpoint,
    GiteaCallbackSpaceEndpoint,
    GiteaOauthInitiateSpaceEndpoint,
)

urlpatterns = [
    # credentials
    path("sign-in/", csrf_exempt(SignInAuthEndpoint.as_view()), name="sign-in"),
    path("sign-up/", csrf_exempt(SignUpAuthEndpoint.as_view()), name="sign-up"),
    path("spaces/sign-in/", csrf_exempt(SignInAuthSpaceEndpoint.as_view()), name="space-sign-in"),
    path("spaces/sign-up/", csrf_exempt(SignUpAuthSpaceEndpoint.as_view()), name="space-sign-up"),
    # signout
    path("sign-out/", csrf_exempt(SignOutAuthEndpoint.as_view()), name="sign-out"),
    path("spaces/sign-out/", csrf_exempt(SignOutAuthSpaceEndpoint.as_view()), name="space-sign-out"),
    # csrf token
    path("get-csrf-token/", CSRFTokenEndpoint.as_view(), name="get_csrf_token"),
    # Magic sign in
    path("magic-generate/", csrf_exempt(MagicGenerateEndpoint.as_view()), name="magic-generate"),
    path("magic-sign-in/", csrf_exempt(MagicSignInEndpoint.as_view()), name="magic-sign-in"),
    path("magic-sign-up/", csrf_exempt(MagicSignUpEndpoint.as_view()), name="magic-sign-up"),
    path(
        "spaces/magic-generate/",
        MagicGenerateSpaceEndpoint.as_view(),
        name="space-magic-generate",
    ),
    path(
        "spaces/magic-sign-in/",
        MagicSignInSpaceEndpoint.as_view(),
        name="space-magic-sign-in",
    ),
    path(
        "spaces/magic-sign-up/",
        MagicSignUpSpaceEndpoint.as_view(),
        name="space-magic-sign-up",
    ),
    ## Google Oauth
    path("google/", csrf_exempt(GoogleOauthInitiateEndpoint.as_view()), name="google-initiate"),
    path("google/callback/", csrf_exempt(GoogleCallbackEndpoint.as_view()), name="google-callback"),
    path(
        "spaces/google/",
        GoogleOauthInitiateSpaceEndpoint.as_view(),
        name="space-google-initiate",
    ),
    path(
        "spaces/google/callback/",
        GoogleCallbackSpaceEndpoint.as_view(),
        name="space-google-callback",
    ),
    ## Github Oauth
    path("github/", csrf_exempt(GitHubOauthInitiateEndpoint.as_view()), name="github-initiate"),
    path("github/callback/", csrf_exempt(GitHubCallbackEndpoint.as_view()), name="github-callback"),
    path(
        "spaces/github/",
        GitHubOauthInitiateSpaceEndpoint.as_view(),
        name="space-github-initiate",
    ),
    path(
        "spaces/github/callback/",
        GitHubCallbackSpaceEndpoint.as_view(),
        name="space-github-callback",
    ),
    ## Gitlab Oauth
    path("gitlab/", csrf_exempt(GitLabOauthInitiateEndpoint.as_view()), name="gitlab-initiate"),
    path("gitlab/callback/", csrf_exempt(GitLabCallbackEndpoint.as_view()), name="gitlab-callback"),
    path(
        "spaces/gitlab/",
        GitLabOauthInitiateSpaceEndpoint.as_view(),
        name="space-gitlab-initiate",
    ),
    path(
        "spaces/gitlab/callback/",
        GitLabCallbackSpaceEndpoint.as_view(),
        name="space-gitlab-callback",
    ),
    # Email Check
    path("email-check/", csrf_exempt(EmailCheckEndpoint.as_view()), name="email-check"),
    path("spaces/email-check/", csrf_exempt(EmailCheckSpaceEndpoint.as_view()), name="email-check"),
    # Password
    path("forgot-password/", csrf_exempt(ForgotPasswordEndpoint.as_view()), name="forgot-password"),
    path(
        "reset-password/<uidb64>/<token>/",
        ResetPasswordEndpoint.as_view(),
        name="forgot-password",
    ),
    path(
        "spaces/forgot-password/",
        ForgotPasswordSpaceEndpoint.as_view(),
        name="space-forgot-password",
    ),
    path(
        "spaces/reset-password/<uidb64>/<token>/",
        ResetPasswordSpaceEndpoint.as_view(),
        name="space-forgot-password",
    ),
    path("change-password/", ChangePasswordEndpoint.as_view(), name="forgot-password"),
    path("set-password/", SetUserPasswordEndpoint.as_view(), name="set-password"),
    ## Gitea Oauth
    path("gitea/", csrf_exempt(GiteaOauthInitiateEndpoint.as_view()), name="gitea-initiate"),
    path("gitea/callback/", csrf_exempt(GiteaCallbackEndpoint.as_view()), name="gitea-callback"),
    path(
        "spaces/gitea/",
        GiteaOauthInitiateSpaceEndpoint.as_view(),
        name="space-gitea-initiate",
    ),
    path(
        "spaces/gitea/callback/",
        GiteaCallbackSpaceEndpoint.as_view(),
        name="space-gitea-callback",
    ),
]
