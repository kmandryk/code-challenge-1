import React from "react";
import { shallow, render, mount, configure } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import App from "./App";
//import toJson from "enzyme-to-json";

configure({ adapter: new Adapter() });

it("renders without crashing", () => {
    shallow(<App />);
});