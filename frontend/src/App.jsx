import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import LoginPage from "./Login";
import UserHomePage from "./UserHomePage";
import AdminHomePage from "./AdminHomePage";
import Layout from "./Layout";
import PollForm from "./PollForm";
import PollVoteForm from "./PollVoteForm";
import PollResults from "./PollResults";

const App = () => {
  return (
    <Router>
      <AnimatePresence wait>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/userhome"
            element={
              <Layout>
                <UserHomePage />
              </Layout>
            }
          />
          <Route
            path="/adminhome"
            element={
              <Layout>
                <AdminHomePage />
              </Layout>
            }
          />
          <Route
            path="/pollform"
            element={
              <Layout>
                <PollForm />
              </Layout>
            }
          />
          <Route
            path="/pollvoteform/:title/:description"
            element={
              <Layout>
                <PollVoteForm />
              </Layout>
            }
          />
          <Route
            path="/pollresults/:title"
            element={
              <Layout>
                <PollResults />
              </Layout>
            }
          />
        </Routes>
      </AnimatePresence>
    </Router>
  );
};

export default App;
