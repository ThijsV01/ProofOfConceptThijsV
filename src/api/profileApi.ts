import type { ReadingProfile } from "../types/Profile";
import { apiFetch } from "./client";

type ProfileResponse = {
    profile: ReadingProfile;
};

export function getProfile() {
    return apiFetch<ProfileResponse>("/profile").then(
        (response) => response.profile
    );
}

export function createProfile(profile: ReadingProfile) {
    return apiFetch<ReadingProfile>("/profile", {
        method: "POST",
        body: JSON.stringify(profile),
    });
}

export function updateProfile(profile: ReadingProfile) {
    return apiFetch<ReadingProfile>("/profile", {
        method: "PUT",
        body: JSON.stringify(profile),
    });
}