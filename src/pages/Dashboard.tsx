import React from 'react';
import { IonContent, IonPage, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonRouterLink } from '@ionic/react';
import Header from '../components/Header';

const Dashboard: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  return (

  <IonPage>
    <Header title="Dashboard" showBackButton isAuthenticated={isAuthenticated}/>
    <IonContent className="ion-padding ion-text-center ion-justify-content-center ion-align-items-center ion-content-full-height">
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Services</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonRouterLink routerLink="/services-list">
            View Services
          </IonRouterLink>
        </IonCardContent>
      </IonCard>

      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Subscriptions</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonRouterLink routerLink="/subscriptions-list">
            View Subscriptions
          </IonRouterLink>
        </IonCardContent>
      </IonCard>
    </IonContent>
  </IonPage>
)};

export default Dashboard;
