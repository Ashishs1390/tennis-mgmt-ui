import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import { styled } from '@mui/material/styles';
// import reducer from '../store';
// import Header from './ProductsHeader';
import Header from '../common-components/header/Header';
import StrockAnalysisList from './strock-analysis-list';
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
        padding:'10px 20px'
    },
    '& .FusePageCarded-contentCard': {
        overflow: 'hidden',
    },
}));

function StrockAnalysisWrapper() {
    return (<>
        <Root header={<Header title="Stroke Analysis List" />} content={<StrockAnalysisList />} innerScroll />;
    </>)


}

export default StrockAnalysisWrapper;

