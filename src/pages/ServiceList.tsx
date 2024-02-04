import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonPage,
  IonCard,
  IonCardContent,
  IonButton,
  IonList,
  IonLabel,
  IonSpinner,
  IonToast,
  IonRow,
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonLoading,
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
  {
    id: 2,
    name: "Service B",
    description: `Description for Service B. Lorem ipsum dolor sit amet consectetur adipisicing elit. 
  Magni illum quidem recusandae ducimus quos reprehenderit. Veniam, molestias quos, dolorum consequuntur nisi deserunt omnis id illo sit cum qui.
  Eaque, dicta.`,
  },
  {
    id: 3,
    name: "Service C",
    description: `Description for Service C. Lorem ipsum dolor sit amet consectetur adipisicing elit. 
  Magni illum quidem recusandae ducimus quos reprehenderit. Veniam, molestias quos, dolorum consequuntur nisi deserunt omnis id illo sit cum qui.
  Eaque, dicta.`,
  },
  // Add more services as needed
];

const ServicesList: React.FC = () => {
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

      const response = await axios.get(API_URL + "service/services", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setServices(response.data.services);
    } catch (error) {
      setToastMessage("Error fetching services. Using mock data.");
      setError("Error fetching services. Using mock data.");
    } finally {
      setLoading(false);
    }
  };


  const subscribeToService = async (service: {
    id: number;
    name: string;
    description: string;
  }) => {
    try {
      const token = localStorage.getItem("token");
      const subscriberEmail = localStorage.getItem("subscriberEmail");

      const data = {
        subscriberEmail: subscriberEmail,
        serviceName: service.name,
        amountPaid: 0,
      };

      const response = await axios.post(
        API_URL + "subscription/subscribe",
        JSON.stringify(data),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setServices(response.data.services);
    } catch (error) {
      setToastMessage("Error subscribing to service.");
    } finally {
      setLoading(false);
      setIsOpen(false);
      setCurrentService(null as any);
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
      <Header title="Services List" showBackButton />
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
                    <IonRow className="ion-justify-content-between">
                      <IonButton
                        size="small"
                        fill="outline"
                        onClick={() => viewService(service)}
                      >
                        View Service
                      </IonButton>

                      <IonButton
                        size="small"
                        onClick={() => subscribeToService(service)}
                      >
                        Subscribe
                      </IonButton>
                    </IonRow>
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
                  <IonRow className="ion-justify-content-between">
                    <IonButton
                      size="small"
                      fill="outline"
                      onClick={() => viewService(service)}
                    >
                      View Service
                    </IonButton>

                    <IonButton
                      size="small"
                      onClick={() => subscribeToService(service)}
                    >
                      Subscribe
                    </IonButton>
                  </IonRow>
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
              <IonButton
                expand="block"
                onClick={() => subscribeToService(currentService)}
              >
                Subscribe
              </IonButton>
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

export default ServicesList;
