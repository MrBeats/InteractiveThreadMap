# Projekt: Interactive threat map

### Kurzbeschreibung

Dieses Projekt wurde im Rahmen des Moduls Datenvisualisierung für das Studium Informatik an der Freien Universität Berlin erstellt. Ziel dieses Projektes ist es, eine interaktive Karte mit den aktuellsten und größten Gefahren für alle aktuellen partner-Institute des DFG zu entwickeln.

## Inhaltsverzeichnis
1. [Beschreibung](#desc)
2. [Installation](#installation)
3. [Manual](#man)
4. [Autoren](#aut)
5. [Copyright](#cop)

<a name="desc"></a>
## Beschreibung

Ziel dieser Visualisierung ist die Darstellung von verschiedenen Gefahren, welche bei sämtlichen Partner-Instituten des DFG auftreten oder aufgetreten sind. Die Visualisierung richtet sich dabei an Studenten die an einem Projekt an einem bestimmten Ort mitarbeiten wollen oder Forscher, die an einem Partner-Institut ein Projekt starten möchten, um sich vorab über dortige Gefahren informieren zu können. In den letzten Wochen und Monaten sind überall auf der Welt riesige Brände ausgebrochen, welche überall Spuren der Zerstörung hinterlassen. Der erste Datensatz befasst sich daher mit der Gefahr des Feuers. Die entsprechenden Daten stammen dabei von der NASA, welche mithilfe der Daten aus dem Moderate Resolution Imaging Spectroradiometer und der Visible Infrared Imaging Radiometer Suite aktuelle Daten der letzten 24h, 48h und 7 Tagen bereitstellt. Der Datensatz beinhaltet dabei den Ort des Feuers, angegeben in Latitude und Longitude. Eine weitere Gefahr stellt der weltweite Terrorismus dar. Das National Consortium for the Study of Terrorism and Responses to Terrorism stellt hierfür die Global Terrorism Database (GTD) bereit, welche in diesem Projekt ebenfalls visualisiert wird. Der Datensatz beinhaltet dabei Informationen über Terroranschläge weltweit seit dem Jahr 1970, mit detaillierten Informationen unter anderem zum Ziel, den Angreifern, den Opferzahlen und dem Ort in Latitude und Longitude. Als dritte Gefahr wird in dem Projekt die Ausbreitung des Corona-Virus visualisiert. Die Daten dafür stammen hierbei aus einem unabhängigen GitHub-Repository, welches täglich aktualisiert wurde. Da aufgrund des, bis jetzt, sehr kurzen Bestehens der Gefahr keine genauen Angaben zur Ausbreitung bezogen auf bestimmte Orte zur Verfügung stehen, beinhaltet der Datensatz nur Zahlen zu Ländern, inklusive der offiziellen Zahlen der Infizierten und den Todesopfern. Alle Daten liegen hierbei im .csv-Format vor und sind daher statisch. Ebenfalls geplant war eine Anbindung an eine API, was aus Zeitgründen jedoch leider nicht mehr umgesetzt werden konnte. Beim Feuer-Datensatz zeigen wir daher nur die letzten 24h des letzten Daten-Exportes (Export am 26.01.2020). Beim Terrorismus-Datensatz haben wir und für die gesamte Zeitspanne seit 1970 entschieden, um auch eine Übersicht von Gefahren an einem Ort visualisieren zu können. Dies erleichtert eventuelle Prognosen. Der Corona-Datensatz ist ebenfalls der letzte Daten-Export (Export am 04.02.2020), welcher die aktuellen offiziellen Zahlen zu diesem Zeitpunkt enthält. 
Ziel der Visualisierung ist die Darstellung der Institute und die entsprechenden Gefahren bezogen auf die Umgebung mit der Intention, sich auf mögliche Forschungsstandorte vorzubereiten. Um dies angemessen zu gewährleisten, haben wir uns beim high level der three level of actions für ein ‘Discover’ entschieden. In Verbindung mit einem ‘Lookup’ bzw. ‘Browse’ im mid level und einem ‘Summarize’ im low-level, kann der Nutzer sich einerseits über bestimmte Gefahren an einem bestimmten Standort informieren und gleichzeitig allgemein eine Zusammenfassung von Gefahren an einem bestimmten Standort erforschen.
Beim Encoding haben wir uns für eine Weltkarte in Mercator-Projektion entschieden, da wir geo spezifische Daten visualisieren und diese Form weit verbreitet und intuitiv zu nutzen ist. Jede Gefahr ist dabei mit einer eigenen Farbe codiert. Feuer wird dabei Rot dargestellt, Terrorismus Grün und der Corona-Virus Blau. Für diese Farbwahl haben wir uns entschieden, da diese Farben die drei Grundfarben der additiven Farbmischung darstellen. Das hat den großen Vorteil, dass damit der größtmögliche Kontrast gegeben ist und sich die Datensätze sehr gut voneinander abgrenzen. Als Nachteil zeigt sich jedoch, dass Nutzer mit einer Rot-Grün schwäche mit dieser Farbwahl die Gefahren eventuell nicht mehr eindeutig identifizieren können. Je nach Detailgrad der Datensätze sind die geografischen Informationen entweder in Form von Punkten (Feuer und Terrorismus) oder Flächen (Corona-Virus) in die Karte gezeichnet. Die Visualisierungen der Corona-Daten wurden mit einem festen Transparenzwert versehen, um die zugrundeliegende Karte nicht vollständig zu verdecken. Damit kann sich besser auf der Karte orientiert werden. Auf eine prozentuale Berechnung der Transparenz aufgrund der Infektionszahlen wurde verzichtet, da das Ziel der Visualisierung dieses Datensatzes eine allgemeine Übersicht über die Liste der Infizierten Länder und nicht über den Grad der Infektion ist.
Bei der Interaktion haben wir uns für insgesamt 4 Möglichkeiten entschieden. Bevor man zur eigentlichen Visualisierung gelang, scrollt der Nutzer über verschiedene Layer. In jedem Layer wird die Herkunft eines Datensatzes erklärt und in den Datensatz eingeleitet. Damit wird dem Nutzer eine schnelle Übersicht über die verwendeten Daten und Quellen, sowie das Thema ermöglicht. Im Hintergrund jedes Layers ist dabei eine Übersicht der Daten auf der Mercator-Projektion zu sehen, was dem Nutzer die spätere Verwendung der Visualisierung stark erleichtert. Der letzte Layer beinhaltet dann die eigentliche Visualisierung, inklusive einiger Filtermöglichkeiten. Die Karte startet dabei aus Performance-Gründen mit einem Zoom auf Deutschland. Die erste Filtermöglichkeit (und zweite Interaktion) ist eine Suchleiste, in welcher der Nutzer nach einem bestimmten DFG-Partner Institut suchen kann. Die Suchergebnisse werden dabei aus Performance-Gründen jedoch erst angezeigt, wenn die Eingabe des Nutzers nur noch 15 Treffer oder weniger ergibt. Die möglichen Institute werden dabei aus dem Datensatz der Institute berechnet. Wenn der Nutzer ein bestimmtes Institut auswählt, wird der Zoom der Karte an die entsprechende Stelle gesetzt und zeigt alle Gefahren in der näheren Umgebung. Die zweite Filtermöglichkeit (und dritte Interaktion) erlaubt dem Nutzer, einen oder mehrere Datensätze auszublenden. Dabei haben wir uns für Checkboxen entschieden, da somit eine einfache Filterung und schnelle und verständliche Bedienung ermöglicht wird. Die Letzte Interaktionsmöglichkeit umfasst die Interaktion mit der Karte selbst. Neben dem Verschieben der Karte haben wir uns für ein Tooltip bei einem Mouseover über die Institute entschieden, damit der Nutzer sich einen guten Überblick über den genauen Standort eines Institutes und auch über umliegende Institute verschaffen kann.
Bei der technischen Umsetzung haben wir uns neben d3js für eine React-Anwendung entschieden. Dies bietet uns den Vorteil einer technischen Architektur, welche sich technisch auf dem neuesten Stand befindet und es uns aufgrund einiger Features erleichtert, Änderungen an der Visualisierung besser zu laden. Die Darstellung der Karte haben wir dabei mit Mapbox realisiert. Das größte Problem in der Umsetzung stellte die Performance dar. Mit ca. 600.000 Feuern, 180.000 terroristischen Anschlägen, 6000 Instituten und 28 infizierten Ländern, hatten wir beim Rendern der Seite teilweise sehr lange Ladezeiten. Daher sind wir während der Implementierung schnell von SVGs auf Canvases umgestiegen. Weiterhin stellen wir nun die Punkte nicht als Kreise, sondern als Rechtecke dar, da sich diese leichter berechnen lassen. Einen weiteren großen Performance-Boost brachte das Entfernen nicht benötigter Daten aus der Berechnung. Dabei werden alle Datensätze, welche sich nicht mehr im sichtbaren Kartenausschnitt befinden, entfernt, damit diese auch nicht mehr gerendert werden. Trotz all dieser Optimierungen stellt die Performance jedoch noch immer ein Problem dar. Aus diesem Grund wollten wir die Visualisierung eventuell noch mit WebGL Shadern auf der GPU optimieren, was aus zeitlichen Gründen jedoch leider nicht mehr umgesetzt werden konnte.


<a name="installation"></a>
## Installation

Die Visualisierung ist online unter folgendem Link erreichbar: https://mrbeats.github.io/InteractiveThreadMap/

Für eine manuelle Installation, installieren Sie npm und nodejs. Anschließend führen Sie im Projektverzeichnis erst `npm install` und anschließend `npm start` aus. Die Visualisierung ist anschließend über localhost:3000 erreichbar. Für genaue Informationen lesen Sie an Ende dieser Datei die direkte Beschreibung von [React](#react).

<a name="man"></a>
## Manual

Zur Veranschaulichung und Erklärung des Funktionsumfangs und der Funktionsweise schauen Sie sich bitte das Video im /screencast - Verzeichnis an.

<a name="aut"></a>
## Autoren:

- Jamie Schenker (https://github.com/xXPOLYGONXx)
- Marvin Schendel (https://github.com/MrBeats)

<a name="cop"></a>
## Copyright

Data derived from original data provided by https://gepris.dfg.de (c) Deutsche Forschungsgemeinschaft



------------------------------------------------------------------


<a name="react"></a>
## React

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
