import { RootState } from "app/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, GridColumn, GridRow } from "semantic-ui-react";
import { getListMessage } from "./chatSlice";
import ContentChat from "./components/contentchat/ContentChat";
import ListChat from "./components/listchat/ListChat";
import "./styles.scss";
import UserInfo from "./components/userinfo/UserInfo";
import SendBar from "./components/sendbar";
import { createMyRoom } from "app/api/chat";

const Chat = () => {
  const userId = useSelector((s: RootState) => s.login.userId);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(getListMessage());
      createMyRoom(userId)
    }
  }, []);

  return (
    <div className="chat-page">
      <Grid>
        <GridRow>
          <GridColumn computer={4} className="chat-page-listchat">
            <ListChat />
          </GridColumn>
          <GridColumn computer={12} className="chat-page-content">
            <Grid>
              <GridRow>
                <GridColumn computer={12}>
                  <ContentChat />
                  <div className="chat-main">
                    <SendBar />
                  </div>
                </GridColumn>
                <GridColumn computer={4}>
                  <UserInfo />
                </GridColumn>
              </GridRow>
            </Grid>
          </GridColumn>
        </GridRow>
      </Grid>
    </div>
  );
};

export default React.memo(Chat);
