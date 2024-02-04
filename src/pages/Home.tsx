import React from "react";
import {
  IonContent,
  IonPage,
  IonButton,
  IonImg,
  IonRouterLink,
} from "@ionic/react";
import Header from "../components/Header";
import image from "../../resources/home.svg";

const Home: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  return (
  <IonPage>
    <Header title="First Fintech" isAuthenticated={isAuthenticated} />
    <IonContent className="ion-padding ion-text-center ion-justify-content-center ion-align-items-center ion-content-full-height">
      <IonImg src={image} alt="First App"></IonImg>
      <p>Welcome to First App!</p>
      <IonRouterLink routerLink="/login">Login here.</IonRouterLink>
    </IonContent>
  </IonPage>
)};

export default Home;
