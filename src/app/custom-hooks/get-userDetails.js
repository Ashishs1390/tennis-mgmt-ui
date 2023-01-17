import { useState } from 'react';
export default function useUserDetails() {
    const [{ playerName }] = useState({
        playerName: (JSON.parse(localStorage.getItem("childInfo")).length !== 0) ? `${JSON.parse(localStorage.getItem("childInfo")).first_name} ${JSON.parse(localStorage.getItem("childInfo")).last_name}`
            : `${JSON.parse(localStorage.getItem("localStore")).first_name} ${JSON.parse(localStorage.getItem("localStore")).last_name}`,
    });

    return [playerName];
}

