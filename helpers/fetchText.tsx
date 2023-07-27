import { Callout } from 'nextra-theme-docs';
import { Topic } from '../topics';

const KeyToVal = {
    MyKey1: 'myValue1',
    MyKey2: 'myValue2',
} as const;

type Keys = keyof typeof KeyToVal;
type Values = typeof KeyToVal[Keys]; //  "myValue1" | "myValue2"

export const CalloutExample = ({text}: any) => {
    let textValue = "Error";
    if (text == "foo-bar") {
        textValue = "Foo Bar"
    }
    return(
    <Callout emoji="✅">
        { textValue }
    </Callout>);}


export const H1 = (props: any) => {
    return(
    <h1 className="nx-mt-2 nx-text-4xl nx-font-bold nx-tracking-tight nx-text-slate-900 dark:nx-text-slate-100">Testing 123</h1>
      );}


export const importTopic = (id: Topic) => {
    //return Topic[id];
    return "foo"
}