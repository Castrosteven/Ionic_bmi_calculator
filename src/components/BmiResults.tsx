import React from "react";

import { IonCol, IonRow, IonCard, IonCardContent } from "@ionic/react";

const BmiResults: React.FC<{ result: number }> = (props) => {
  return (
    <IonRow>
      <IonCol>
        <IonCard>
          <IonCardContent className="ion-text-center">
            <h1>Your Body Mass Index</h1>
            <h2>{props.result.toFixed(2)}</h2>
          </IonCardContent>
        </IonCard>
      </IonCol>
    </IonRow>
  );
};

export default BmiResults;
