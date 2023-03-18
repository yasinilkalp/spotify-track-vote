import { Tooltip } from "@mui/material";

const TrackVoteUsers = (props) => {
    const { item, index } = props;
    return <div className={`vote-users border-t px-4 py-2 flex items-center ${index < 3 ? "justify-between" : "justify-end"}`}>
        {index < 3 && <span class="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
            {index + 1}
        </span>
        }
        <div className="flex">
            {item.votes.map((v, i) => {
                return i < 3 && <div key={i} className={`group flex justify-center relative -ml-2 cursor-pointer`}>
                    <Tooltip title={v.user.displayName}>
                        <img src={v.user.photoURL} className="rounded-full w-8 shadow-md border" />
                    </Tooltip>
                </div>
            })}
            {item.votes.length > 3 && <div key="others" className="flex justify-center items-center relative -ml-2 cursor-pointer bg-white rounded-full w-8 h-8 border text-center text-xs text-gray-600">
                <Tooltip title={item.votes.map(s => s.displayName).join(', ')}>
                    <span>+{item.votes.length - 3}</span>
                </Tooltip>
            </div>}
        </div>
    </div>
};

export default TrackVoteUsers;