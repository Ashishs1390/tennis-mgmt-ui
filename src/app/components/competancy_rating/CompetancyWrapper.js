import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import { styled } from '@mui/material/styles';
// import reducer from '../store';
// import Header from './ProductsHeader';
import Header from '../common-components/header/Header';
// import UserListAggregation from './UserListAggregation';
import CompetancyRating from "./competancy_rating"
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
        // display: 'flex',
    },
    '& .FusePageCarded-contentCard': {
        overflow: 'hidden',
    },
}));

function CompetancyAssessmentWrapper() {
    // return <div>Video Analyaia page</div>
    return (<>
        <Root header={<Header title="Player Assessment" />} content={<CompetancyRating />} innerScroll />;
    </>)


}

export default CompetancyAssessmentWrapper;

// export default withReducer('eCommerceApp', reducer)(Products);
