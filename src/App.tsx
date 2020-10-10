import React, { useRef, useState } from "react";

import {
  IonInput,
  IonItem,
  IonLabel,
  IonApp,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonRow,
  IonTitle,
  IonToolbar,
  IonAlert,
} from "@ionic/react";

import BmiControls from "./components/BmiControls";
import BmiResults from "./components/BmiResults";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import InputControl from "./components/inputControl";

const App: React.FC = () => {
  const [calculatedBMI, setCalculatedBMI] = useState<number>();
  const [error, setError] = useState<string>();
  const [calcUnits, setCalcUnits] = useState<"mkg" | "ftlbs">("ftlbs");

  const heightInput = useRef<HTMLIonInputElement>(null);
  const weightInput = useRef<HTMLIonInputElement>(null);

  const calculateBmi = () => {
    const enteredHeight = heightInput.current!.value;
    const enteredWeight = weightInput.current!.value;

    if (
      !enteredWeight ||
      !enteredHeight ||
      +enteredHeight <= 0 ||
      +enteredWeight <= 0
    ) {
      setError("Please Enter a number greater than 0");
      return;
    }
    const weightConversionFactor = calcUnits === "ftlbs" ? 2.2 : 1;
    const heightConversionFactor = calcUnits === "ftlbs" ? 3.28 : 1;

    const weight = +enteredWeight / weightConversionFactor;
    const height = +enteredHeight / heightConversionFactor;

    const bmi = +weight / (height * height);

    setCalculatedBMI(bmi);
  };

  const resetInput = () => {
    weightInput.current!.value = "";
    heightInput.current!.value = "";
  };

  const resetError = () => {
    setError("");
  };

  const SelectCalcUnitHandler = (selectedValue: "mkg" | "ftlbs") => {
    setCalcUnits(selectedValue);
  };

  return (
    <React.Fragment>
      <IonAlert
        isOpen={!!error}
        message={error}
        buttons={[
          {
            text: "Okay",
            handler: resetError,
          },
        ]}
      ></IonAlert>
      <IonApp>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle> BMI Calculator </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonRow>
            <IonCol>
              <InputControl
                selectedValue={calcUnits}
                onSelectValue={SelectCalcUnitHandler}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">
                  Your Height in {calcUnits === "mkg" ? "Meters" : "Feet"}
                </IonLabel>
                <IonInput type="number" ref={heightInput}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">
                  Your Weight in {calcUnits === "mkg" ? "Kg" : "Lb"}
                </IonLabel>
                <IonInput type="number" ref={weightInput}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <BmiControls onCalculate={calculateBmi} onReset={resetInput} />
          <IonGrid>
            {calculatedBMI && <BmiResults result={calculatedBMI} />}
          </IonGrid>
        </IonContent>
      </IonApp>
    </React.Fragment>
  );
};

export default App;
