import React from "react";

import { Grid } from "@mui/material";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

//Navigations and Sidebar
import ToolBar from "./components/Navigation/ToolBar/ToolBar";
import SideBar from "./components/Navigation/SideBar/SideBar";
//Blogs
import Blogs from "./components/Blogs/Blogs";
import CreateBlog from "./components/Blogs/Create/Create";
import EditBlog from "./components/Blogs/Edit/Edit";
//AudioTracks
import AudioTracks from "./components/AudioTracks/AudioTracks";
import CreateAudio from "./components/AudioTracks/Create/Create";
import EditAudio from "./components/AudioTracks/Edit/Edit";
//VideoTracks
import VideoTracks from "./components/VideoTracks/VideoTracks";
import CreateVideo from "./components/VideoTracks/Create/Create";
import EditVideo from "./components/VideoTracks/Edit/Edit";
//Categories
import Categories from "./components/Categories/Categories";
//Blog Category and SubCategory
import BlogCategory from "./components/Categories/BlogCategory/BlogCategories";
import CreateBlogCategory from "./components/Categories/BlogCategory/Create/Create";
import EditBlogCategory from "./components/Categories/BlogCategory/Edit/Edit";
import ViewBlogCategory from "./components/Categories/BlogCategory/View/View";
import CreateBlogSubCategory from "./components/Categories/BlogCategory/View/Create/Create";
//Audio Category and SubCategory
import AudioCategory from "./components/Categories/AudioCategory/AudioCategories";
import CreateAudioCategory from "./components/Categories/AudioCategory/Create/Create";
import EditAudioCategory from "./components/Categories/AudioCategory/Edit/Edit";
import ViewAudioCategory from "./components/Categories/AudioCategory/View/View";
import CreateAudioSubCategory from "./components/Categories/AudioCategory/View/Create/Create";
//Video Category and SubCategory
import VideoCategory from "./components/Categories/VideoCategory/VideoCategories";
import CreateVideoCategory from "./components/Categories/VideoCategory/Create/Create";
import EditVideoCategory from "./components/Categories/VideoCategory/Edit/Edit";
import ViewVideoCategory from "./components/Categories/VideoCategory/View/View";
import CreateVideoSubCategory from "./components/Categories/VideoCategory/View/Create/Create";
//Guided Meditation Category and SubCategory
import GuidedMeditationCategory from "./components/Categories/GuidedMeditationCategory/GuidedMeditationCategories";
import CreateGuidedMeditationCategory from "./components/Categories/GuidedMeditationCategory/Create/Create";
import EditedGuidedMeditationCategory from "./components/Categories/GuidedMeditationCategory/Edit/Edit";
import ViewGuidedMeditationCategory from "./components/Categories/GuidedMeditationCategory/View/View";
import CreateGuidedMeditationSubCategory from "./components/Categories/GuidedMeditationCategory/View/Create/Create";
//Motivations
import Motivation from "./components/Motivation/Motivation";
import CreateMotivation from "./components/Motivation/Create/Create";
import EditMotivation from "./components/Motivation/Edit/Edit";
//GuidedMeditation
import GuidedMeditation from "./components/GuidedMeditation/GuidedMeditation";
import CreateGuidedMeditation from "./components/GuidedMeditation/Create/Create";
import EditGuidedMeditation from "./components/GuidedMeditation/Edit/Edit";
import ViewGuidedMeditation from "./components/GuidedMeditation/View/View"; //for media viewing for guided meditation
import Auth from "./components/Auth/Auth";
import TermsConditions from "./components/TermsConditions/TermsConditions";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
import Coupons from "./components/Coupons/Coupons";
import Users from "./components/Users/Users";
import User from "./components/Users/User/User";
import Faqs from "./components/Faqs/Faqs";
import AddFaq from "./components/Faqs/AddFaq/AddFaq";
import EditFaq from "./components/Faqs/EditFaq/EditFaq";

function App() {
  const user = JSON.parse(localStorage.getItem("profile"));
  let routes = (
    <Switch>
      <Route path="/" exact component={Auth} />

      <Route component={() => <Redirect to="/" />} />
    </Switch>
  );
  if (user) {
    routes = (
      <>
        <ToolBar />
        <SideBar />

        <Route
          path="/"
          exact
          component={() => <Redirect to="/dashboard/users" />}
        />
        <Switch>
          {/* Blog Routes */}
          <Route path="/dashboard/blogs" exact component={Blogs} />
          <Route path="/dashboard/blog/create" exact component={CreateBlog} />
          <Route path="/dashboard/blog/edit/:id" exact component={EditBlog} />
          {/* Audio Routes */}
          <Route path="/dashboard/audiotracks" exact component={AudioTracks} />
          <Route
            path="/dashboard/audiotracks/create"
            exact
            component={CreateAudio}
          />
          <Route
            path="/dashboard/audiotracks/edit/:id"
            exact
            component={EditAudio}
          />
          {/* Video Routes */}
          <Route path="/dashboard/videotracks" exact component={VideoTracks} />
          <Route
            path="/dashboard/videotracks/create"
            exact
            component={CreateVideo}
          />
          <Route
            path="/dashboard/videotracks/edit/:id"
            exact
            component={EditVideo}
          />
          {/* Category Routes */}
          <Route path="/dashboard/categories" exact component={Categories} />
          <Route
            path="/dashboard/categories/blog"
            exact
            component={BlogCategory}
          />
          <Route
            path="/dashboard/categories/blog/create"
            exact
            component={CreateBlogCategory}
          />
          <Route
            path="/dashboard/categories/blog/edit/:id"
            exact
            component={EditBlogCategory}
          />
          <Route
            path="/dashboard/categories/blog/view/:id"
            exact
            component={ViewBlogCategory}
          />
          <Route
            path="/dashboard/categories/blog/subcategory/create/:id"
            exact
            component={CreateBlogSubCategory}
          />
          <Route
            path="/dashboard/categories/audio"
            exact
            component={AudioCategory}
          />
          <Route
            path="/dashboard/categories/audio/create"
            exact
            component={CreateAudioCategory}
          />
          <Route
            path="/dashboard/categories/audio/edit/:id"
            exact
            component={EditAudioCategory}
          />
          <Route
            path="/dashboard/categories/audio/view/:id"
            exact
            component={ViewAudioCategory}
          />
          <Route
            path="/dashboard/categories/audio/subcategory/create/:id"
            exact
            component={CreateAudioSubCategory}
          />
          <Route
            path="/dashboard/categories/video"
            exact
            component={VideoCategory}
          />
          <Route
            path="/dashboard/categories/video/create"
            exact
            component={CreateVideoCategory}
          />
          <Route
            path="/dashboard/categories/video/edit/:id"
            exact
            component={EditVideoCategory}
          />
          <Route
            path="/dashboard/categories/video/view/:id"
            exact
            component={ViewVideoCategory}
          />
          <Route
            path="/dashboard/categories/video/subcategory/create/:id"
            exact
            component={CreateVideoSubCategory}
          />
          <Route
            path="/dashboard/categories/guidedmeditation"
            exact
            component={GuidedMeditationCategory}
          />
          <Route
            path="/dashboard/categories/guidedmeditation/create"
            exact
            component={CreateGuidedMeditationCategory}
          />
          <Route
            path="/dashboard/categories/guidedmeditation/edit/:id"
            exact
            component={EditedGuidedMeditationCategory}
          />
          <Route
            path="/dashboard/categories/guidedmeditation/view/:id"
            exact
            component={ViewGuidedMeditationCategory}
          />
          <Route
            path="/dashboard/categories/guidedmeditation/subcategory/create/:id"
            exact
            component={CreateGuidedMeditationSubCategory}
          />
          {/* Motivation Routes */}
          <Route path="/dashboard/motivation" exact component={Motivation} />
          <Route
            path="/dashboard/motivation/create"
            exact
            component={CreateMotivation}
          />
          <Route
            path="/dashboard/motivation/edit/:id"
            exact
            component={EditMotivation}
          />
          {/* Guided Meditation Routes */}
          <Route
            path="/dashboard/guidedmeditation"
            exact
            component={GuidedMeditation}
          />
          <Route
            path="/dashboard/guidedmeditation/create"
            exact
            component={CreateGuidedMeditation}
          />
          <Route
            path="/dashboard/guidedmeditation/edit/:id"
            exact
            component={EditGuidedMeditation}
          />
          <Route
            path="/dashboard/guidedmeditation/view/:id"
            exact
            component={ViewGuidedMeditation}
          />
          <Route path="/dashboard/users" exact component={Users} />
          <Route path="/dashboard/user/:id" exact component={User} />
          <Route path="/dashboard/faq" exact component={Faqs} />
          <Route path="/dashboard/faq/add" exact component={AddFaq} />
          <Route path="/dashboard/faq/edit/:id" exact component={EditFaq} />
          <Route path="/dashboard/tac" exact component={TermsConditions} />
          <Route
            path="/dashboard/privacypolicy"
            exact
            component={PrivacyPolicy}
          />
          <Route path="/dashboard/coupons" exact component={Coupons} />
        </Switch>
      </>
    );
  }
  return (
    <BrowserRouter>
      <Grid container>{routes}</Grid>
    </BrowserRouter>
  );
}

export default App;
