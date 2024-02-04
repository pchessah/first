import React from "react";
import {
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  IonRouterLink,
  IonCard,
} from "@ionic/react";
import Header from "../components/Header";

const SignUp: React.FC = () => {
  return (
    <IonPage>
      <Header title="Sign Up" showBackButton />
      <IonContent className="ion-padding ion-justify-content-center ion-align-items-center ion-content-full-height">
        <IonCard className="ion-padding ">
          <IonInput
            labelPlacement="floating"
            label="Enter your email"
            fill="outline"
            className="ion-margin-bottom"
          />

          <IonInput
            label="Enter your phone number"
            type="tel"
            fill="outline"
            labelPlacement="floating"
            className="ion-margin-bottom"
          ></IonInput>

          <IonInput
            labelPlacement="floating"
            label="Enter your password"
            type="password"
            className="ion-margin-bottom"
            fill="outline"
          />

          <IonButton
            expand="full"
            onClick={() => console.log("Sign Up clicked")}
          >
            Sign Up
          </IonButton>

          <IonRouterLink routerLink="/login">
            Already have an account? Login here.
          </IonRouterLink>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default SignUp;
