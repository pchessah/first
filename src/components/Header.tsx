import React from "react";
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonIcon,
  IonButton,
} from "@ionic/react";
import { logOut } from "ionicons/icons";
import { useHistory } from "react-router";

interface HeaderProps {
  title: string;
  isAuthenticated?: boolean;
  showBackButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  isAuthenticated = false,
  showBackButton = false,
}) => {
  const history = useHistory();
  const logout = () => {
    const a = confirm("😓Are you sure you want to log out?");
    if (a) {
      localStorage.removeItem("token");
      localStorage.removeItem("subscriberEmail");
      history.push("/login");
    }
  };
  return (
    <IonHeader>
      <IonToolbar>
        {showBackButton ? (
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
        ) : null}
        <IonTitle>{title}</IonTitle>

        {isAuthenticated ? (
          <IonButtons slot="end">
            <IonButton onClick={logout} size="small" fill="clear">
              <IonIcon slot="icon-only" icon={logOut}></IonIcon>
            </IonButton>
          </IonButtons>
        ) : null}
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
