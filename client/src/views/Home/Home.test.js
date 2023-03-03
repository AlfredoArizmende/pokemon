import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { render } from "@testing-library/react";
import Home from "./Home";

test('should first', () => {
    const loading = false;

    const component = render(<Home loading={loading} />);
    console.log(component);
});