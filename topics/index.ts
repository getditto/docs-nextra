import general from "./general.json";
import branding from "./branding.json";

/**
 * Structure of a topic.
 * 
 * Note: This cannot be enforced on import of the json file but can be typed using typescript. Any non-standard
 * fields are accessible via duck-typing but shouldn't be used.
 * 
 * TODO: Make tags strongly typed.
 */
interface TopicBody {
    text: string;
    tags: string[];
}

/**
 * Topics allows us to have a strongly typed interface to our different json stored topics.
 * Topics can only be accessed through Topic below using the
 * 
 * Topic('topic-id') syntax in mdx/tsx/ts files
 */
type Topics = {
    [x: string]: TopicBody;
}
const Topics: Topics = {
    ...general,
    ...branding
};

/**
 * The method to use to get text from a json topic
 */
export type Topic = keyof typeof Topics;
export const Topic = (id:Topic): string => {
    
    let text = "NO TEXT FOUND - PLACEHOLDER";
    try {
        text = Topics[id].text
    } catch (e) {
        console.log(e);
    }
    
    return text;
}