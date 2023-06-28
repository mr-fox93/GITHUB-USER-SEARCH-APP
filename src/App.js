import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import searchIcon from "../src/starter-code/assets/icon-search.svg";
import locationIcon from "../src/starter-code/assets/icon-location.svg";
import twitterIcon from "../src/starter-code/assets/icon-twitter.svg";
import iconWebsite from "../src/starter-code/assets/icon-website.svg";
import iconCompany from "../src/starter-code/assets/icon-company.svg";

const Body = styled.body`
  min-height: 100vh;
  background-color: white;
  font-family: "Space Mono", monospace;
  //background-color: #f5f5f5;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const UserData = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  text-align: center;
  margin-top: 40px;
  width: auto;
  height: 85px;
  background-color: #f5f5f5;
  border-radius: 6px;
  margin-bottom: 40px;
`;

const BottomSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  border-radius: 6px;
  width: 730px;
  height: 69px;
  padding: 0 15px;
  margin-top: 30px;
  box-shadow: 0px 9px 30px 1px rgba(66, 68, 90, 1);

  ::placeholder {
    color: #4b6a9b !important;
    font-size: 18px;
    font-family: "Space Mono", monospace;
  }
`;

const StyledInput = styled.input`
  flex: 1;
  border: none;
  background-color: transparent;
  font-size: 16px;
  outline: none;
  margin-left: 20px;

  ::placeholder {
    color: red !important;
  }
`;

const SearchButton = styled.button`
  background-color: #0079ff;
  border: none;
  color: white;
  padding: 10px;
  width: 106px;
  height: 50px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  font-family: 16px;
  font-family: "Space Mono", monospace;
`;

const Img = styled.img`
  width: 117px;
  height: 117px;
  border-radius: 50%;
  margin-right: 20px;
`;

const InfoComponent = styled.div`
  display: flex;
  flex-direction: column;
  //margin-top: 30px;
  width: 730px;
  height: 444px;
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: flex-start;
  max-width: 730px; // To samo co szerokość SearchContainer
  justify-content: space-between; // Rozdzieli obraz i InfoComponent na przestrzeń dostępną.
  margin-top: 60px;
  background-color: white;
  border-radius: 6px;
  padding: 1.5rem;
`;

function App() {
  const [input, setInput] = useState("");
  const [user, setUser] = useState([]);
  const [repo, setRepo] = useState([]);

  const handleSearch = () => {
    axios
      .get(`https://api.github.com/users/${input}`)
      .then((res) => {
        setUser(res.data);
        return axios.get(res.data.repos_url);
      })
      .then((res) => setRepo(res.data))
      .catch((error) => console.log("error", error));
  };

  console.log(`user`, user);
  console.log(`repo`, repo);

  return (
    <Body>
      <Wrapper>
        <SearchContainer>
          <img src={searchIcon} alt="search icon" />

          <StyledInput
            type="text"
            placeholder="Search GitHub username..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <SearchButton onClick={handleSearch}>Search</SearchButton>
        </SearchContainer>
        <ContentContainer>
          <Img src={user.avatar_url} />
          <InfoComponent>
            <Header>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: "26px", fontWeight: "bold" }}>
                  {user.name}
                </div>
                <div>
                  <Link to={user.html_url}>@{user.login}</Link>
                </div>
              </div>

              <div>
                Joined{" "}
                {new Date(user.created_at).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </div>
            </Header>
            {user.bio ? (
              <div>{user.bio}</div>
            ) : (
              <div>This profile has no bio.</div>
            )}
            <UserData>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div>Repo</div>
                <div>{user.public_repos}</div>
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <div>Followers</div>
                <div>{user.followers}</div>
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <div>Following</div>
                <div>{user.following}</div>
              </div>
            </UserData>

            <BottomSection>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "7px",
                  fontSize: "15px",
                }}
              >
                <div
                  style={{
                    marginBottom: "25px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <img src={locationIcon} />
                  <span style={{ marginLeft: "10px" }}>
                    {user.location ? user.location : "Not Available"}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img src={iconWebsite} />
                  <Link to={user.blog} style={{ marginLeft: "10px" }}>
                    {user.blog ? user.blog : "Not Available"}
                  </Link>
                </div>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "7px" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    fontSize: "15px",
                    marginBottom: "25px",
                  }}
                >
                  <img src={twitterIcon} />
                  <span style={{ marginLeft: "10px" }}>
                    {user.twitter_username
                      ? user.twitter_username
                      : "Not Available"}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img src={iconCompany} />
                  <span style={{ marginLeft: "10px" }}>
                    {user.company ? user.company : "Not Available"}
                  </span>
                </div>
              </div>
            </BottomSection>
          </InfoComponent>
        </ContentContainer>
      </Wrapper>
    </Body>
  );
}

export default App;
