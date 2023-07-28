import {Topic as getTopic} from "../topics"

export const GetTopic = ({id}: {id:string}) => {
    return <span>{getTopic[id]}</span>
}