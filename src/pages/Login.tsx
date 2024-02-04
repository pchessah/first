import React, { useEffect } from "react";
import {
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  IonRouterLink,
  IonCard,
  IonLoading,
  IonToast,
  IonRippleEffect,
} from "@ionic/react";
import Header from "../components/Header";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { API_URL } from "../shared/constants";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const history = useHistory();

  const handleLogin = async (e: React.MouseEvent<HTMLIonButtonElement, MouseEvent>) => {

    e.preventDefault()

    const email = formData.email;
    const password = formData.password;

    if (!formData.email || !formData.password) {
      setToastMessage("Please enter both email and password.");
      return;
    }
    setLoading(true);

    try {
      const response = await axios.post(
        API_URL+"access/login",
        {
          email,
          password,
        }
      );

      // Assuming the API returns a token upon successful login
      const token = response.data.token ?? email;

      // Handle successful login, for example, store the token in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("subscriberEmail", email);

      history.push("/dashboard");
      setFormData({
        email: "",
        password: ""
      })
      setToastMessage("😃Log in Successful.");
    } catch (error) {
      setToastMessage("😓Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
 
    }
  };

  const handleInputChange = (e: CustomEvent, name: string) => {
    e.preventDefault();
    const value = e.detail.value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem('token');
    if(isAuthenticated) history.push('/dashboard');
  }, [])

  return (
    <IonPage>
      <Header title="Login" showBackButton />
      <IonContent className="ion-padding  ion-justify-content-center ion-align-items-center ion-content-full-height">
        <form>
          <IonCard className="ion-padding">
            <IonInput
              labelPlacement="floating"
              label="Enter your email"
              name="email"
              value={formData.email}
              onIonChange={(e) => handleInputChange(e, 'email')}
              className="ion-margin-bottom"
              fill="outline"
              required
            />

            <IonInput
              labelPlacement="floating"
              label="Enter your password"
              name="password"
              type="password"
              value={formData.password}
              onIonChange={(e) => handleInputChange(e, 'password')}
              className="ion-margin-bottom"
              fill="outline"
              required
            />

            <IonButton disabled={!formData.email.length || !formData.password.length} expand="full" onClick={(e) => { e.preventDefault(); handleLogin(e); }}>
              Login
              <IonRippleEffect></IonRippleEffect>
            </IonButton>

            <IonRouterLink routerLink="/signup">
              Don't have an account? Sign Up here.
            </IonRouterLink>
          </IonCard>
        </form>

        <IonLoading isOpen={loading} message="Logging in..." />
        <IonToast
          isOpen={!!toastMessage}
          message={toastMessage}
          duration={3000}
          onDidDismiss={() => setToastMessage("")}
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
