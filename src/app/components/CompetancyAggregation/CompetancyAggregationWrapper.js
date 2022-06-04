import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import { styled } from '@mui/material/styles';
// import reducer from '../store';
// import Header from './ProductsHeader';
import Header from '../common-components/header/Header';
import UserListAggregation from './UserListAggregation';


import { removeAllNav, setParentCoachNav, resetNavigation } from './../../store/fuse/navigationSlice';
import useManageNavState from "../../custom-hooks/nav-manage";
import { useDispatch } from 'react-redux';

const Root = styled(FusePageCarded)(({ theme }) => ({
    '& .FusePageCarded-header': {
        minHeight: 72,
        height: 72,
        alignItems: 'center',
        [theme.breakpoints.up('sm')]: {
            minHeight: 136,
            height: 136,
        },
    },
    '& .FusePageCarded-content': {
        display: 'flex',
    },
    '& .FusePageCarded-contentCard': {
        overflow: 'hidden',
    },
}));

function CompetancyAggregationWrapper() {
    const dispatch = useDispatch();
    const [userDetails] = useManageNavState({ dispatch, removeAllNav, setParentCoachNav, resetNavigation });
    // return <div>Video Analyaia page</div>
    return (<>
        <Root header={<Header title="Competancy Aggregation" />} content={<UserListAggregation />} innerScroll />;
    </>)


}

export default CompetancyAggregationWrapper;

// export default withReducer('eCommerceApp', reducer)(Products);
