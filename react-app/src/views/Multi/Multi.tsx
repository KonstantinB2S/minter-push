import "./MultiView.scss";

import { Layout } from "antd";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import Loading from "../../components/Layout/Loading";
import { getWallet } from "../../services/walletApi";
import history from "../../stores/history";
import { MultiStoreContext } from "../../stores/multiStore";
import { getCampaign } from "../../services/campaignApi";
import MultiPasswordForm from "../../components/Multi/PasswordForm/PasswordForm";
import MultiMain from "../../components/Multi/Main/MultiMain";

const { Content } = Layout;

const MultiView: React.FC = observer(() => {
  const mStore = useContext(MultiStoreContext);
  const { t, i18n } = useTranslation();
  const { link } = useParams();

  const [state, setState] = useState({
    password: false,
    isLoading: true
  });

  useEffect(() => {
    const init = async () => {
      setState({ ...state, isLoading: true });
      try {
       await mStore.initCampaign(
          link!,
          window.localStorage.getItem("mpass")!
        );
      } catch (error) {
        console.log(error);
        // history.push("/multi");
      }
      setState({...state, isLoading: false})
    };
    init();
  }, []);

  return (
    <Content className="multi-view">
      {state.isLoading ? (
        <Loading />
      ) : (
        <>
          {mStore.link === link && !state.isLoading ? (
            <MultiMain />
          ) : (
            <MultiPasswordForm link={link!} />
          )}
        </>
      )}
    </Content>
  );
});

export default MultiView;
