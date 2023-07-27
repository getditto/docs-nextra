import general from "./general.json";
import mesh from "./mesh.json";
import branding from "./branding.json";

export type Topic = keyof typeof Topic;
export const Topic = {
    ...general,
    ...mesh,
    ...branding
};