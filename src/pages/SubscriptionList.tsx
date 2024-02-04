// src/pages/SubscriptionsList.tsx
import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonLabel,
  IonList,
  IonLoading,
  IonModal,
  IonPage,
  IonRow,
  IonSpinner,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import Header from "../components/Header";
import axios from "axios";
import { API_URL } from "../shared/constants";

const mockServices = [
  {
    id: 1,
    name: "Service A",
    description: `Description for Service A. Lorem ipsum dolor sit amet consectetur adipisicing elit. 
  Magni illum quidem recusandae ducimus quos reprehenderit. Veniam, molestias quos, dolorum consequuntur nisi deserunt omnis id illo sit cum qui.
  Eaque, dicta.`,
  },
];

const SubscriptionsList: React.FC = () => {
  const [services, setServices] = useState([]);
  const [currentService, setCurrentService] = useState<{
    id: number;
    name: string;
    description: string;
  }>(null as any);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const token = localStorage.getItem("token");
      const subscriberEmail = localStorage.getItem("subscriberEmail");

      const response = await axios.get(
        `${API_URL}subscription/subscriptions/${subscriberEmail}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setServices(response.data.services);
    } catch (error) {
      setToastMessage("Error fetching your subscriptions. Using mock data.");
      setError("Error fetching your subscriptions. Using mock data.");
    } finally {
      setLoading(false);
    }
  };

  const viewService = (service: {
    id: number;
    name: string;
    description: string;
  }) => {
    setCurrentService(service);
    setIsOpen(true);
  };

  return (
    <IonPage>
      <Header title="My Subscriptions" showBackButton />
      <IonContent className="ion-padding ion-text-center ion-justify-content-center ion-align-items-center ion-content-full-height">
        {loading ? (
          <IonSpinner />
        ) : error ? (
          <>
            <IonList>
              {mockServices.map((service) => (
                <IonCard key={service.id}>
                  <IonCardContent>
                    <IonLabel className="ion-margin-bottom">
                      {service.name}
                    </IonLabel>

                    <IonButton
                      expand="block"
                      onClick={() => viewService(service)}
                    >
                      View Service
                    </IonButton>
                  </IonCardContent>
                </IonCard>
              ))}
            </IonList>
            <p>{error}</p>
          </>
        ) : (
          <IonList>
            {services.map((service: any) => (
              <IonCard key={service.id}>
                <IonCardContent>
                  <IonLabel className="ion-margin-bottom">
                    {service.name}
                  </IonLabel>

                  <IonButton
                    expand="block"
                    onClick={() => viewService(service)}
                  >
                    View Service
                  </IonButton>
                </IonCardContent>
              </IonCard>
            ))}
          </IonList>
        )}
      </IonContent>

      <IonModal isOpen={isOpen}>
        {currentService ? (
          <>
            <IonHeader>
              <IonToolbar>
                <IonTitle>{currentService.name}</IonTitle>
                <IonButtons slot="end">
                  <IonButton
                    onClick={() => {
                      setIsOpen(false);
                      setCurrentService(null as any);
                    }}
                  >
                    Close
                  </IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
              <p>{currentService.description}</p>
            </IonContent>
          </>
        ) : null}
      </IonModal>

      <IonToast
        isOpen={!!toastMessage}
        message={toastMessage}
        duration={3000}
        onDidDismiss={() => setToastMessage("")}
      />

      <IonLoading isOpen={loading} message="Loading..." />
    </IonPage>
  );
};

export default SubscriptionsList;
