import "jsdom-global/register";
import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "./App";
import Header from "../Header/Header";
import TodoList from "../TodoList/TodoList";
import axios from "axios";
import { act } from "react-dom/test-utils";
import puppeteer from "puppeteer";

configure({ adapter: new Adapter() });

describe("Testing <App />", () => {
    let wrapper: any;

    beforeEach(async () => {
        jest.spyOn(axios, "get").mockResolvedValue({
            status: 200,
            statusText: "OK",
            data: [{ id: "Test", title: "", checked: false }],
        });
        await act(async () => {
            wrapper = await mount(<App />);
        });
    });

    it("Should render one <Header />", async () => {
        expect(wrapper.find(Header).exists()).toEqual(true);
    });

    it("Should render one <TodoList />", async () => {
        expect(wrapper.find(TodoList).exists()).toEqual(true);
    });

    it("Should render one task after adding", async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto("http://localhost:80");
        await page.click(".add-task-input");
        await page.type(".add-task-input", "Testing");
        await page.click(".add-task-btn");
        await page.waitForSelector(`[data-hook="task-title"]`);
        const singleTaskText = await page.$eval(`[data-hook="task-title"]`, (res) => res.textContent);
        expect(singleTaskText).toEqual("Testing");

        browser.close();
    });

    // it("Should render one task from server", async () => {
    //     jest.spyOn(axios, "get").mockResolvedValue({
    //         status: 200,
    //         statusText: "OK",
    //         data: [{ id: "123", title: "Test", checked: false }],
    //     });
    //     const browser = await puppeteer.launch({headless:false});
    //     const page = await browser.newPage();
    //     await page.goto("file:///Users/guysu/Desktop/react-apps/todo/React/src/index.ejs");

    //     browser.close();
    // })
});
