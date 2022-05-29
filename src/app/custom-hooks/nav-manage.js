import { useEffect, useState } from "react";

export default function useManageNavState({ dispatch, removeAllNav, setParentCoachNav, resetNavigation}) {
    const [userDetails] = useState(
        JSON.parse(localStorage.getItem("localStore"))
      );

      useEffect(() => {
        if (userDetails.role === 'parent' || userDetails.role === 'coach') {
          dispatch(removeAllNav());
          dispatch(setParentCoachNav());
        }
    
        return () => {
          if (sessionStorage.getItem('child_email')) {
            dispatch(resetNavigation());
          }
        }
      }, []);

      return [userDetails];
}