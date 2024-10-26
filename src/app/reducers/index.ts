import {combineReducers} from '@reduxjs/toolkit';
import sidebarReducer from 'src/widgets/sidebar/slice/sidebarSlice.ts';
import userReducer from 'src/entities/User/userSlice.ts';
import teamReducer from 'src/entities/Team/teamSlice.ts';
import tasksReducer from 'src/entities/Task/taskSLice.ts';
import ratingReducer from 'src/entities/Rating/ratingSlice.ts';
import newsReducer from 'src/entities/News/newsSlice.ts';
import stageReducer from 'src/entities/Stage/stageSlice.ts';
import productsReducer from 'src/entities/Products/productsSlice.ts';

const rootReducer = combineReducers({
    sidebar: sidebarReducer,
    user: userReducer,
    team: teamReducer,
    tasks: tasksReducer,
    rating: ratingReducer,
    news: newsReducer,
    stage: stageReducer,
    products: productsReducer,
});

export default rootReducer;
