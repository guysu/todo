import puppeteer from "puppeteer";
import { ReturnTypeAsync } from "../../../../../../common/types";

export const appE2EDriver = async () => {
    let browser: puppeteer.Browser, page: puppeteer.Page;

    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto("http://localhost:3232");

    return {
        addTask: async (title: string) => {
            await page.click(".add-task-input");
            await page.type(".add-task-input", "Testing");
            await page.click(".add-task-btn");
            await page.waitForSelector(`[data-hook="task-title"]`);
        },
        getFirstTaskTitle: async () => {
            return await page.$eval(`[data-hook="task-title"]`, (res) => res.textContent);
        },
        close: async () => {
            await browser.close();
        },
        deleteFirstTask: async () => {
            await page.click(".delete-btn");
        },
        isTaskExists: async () => {
            return (await page.$eval(`[data-hook="task-title"]`, (res) => res))
                ? true
                : false;
        },
    };
};

export type AppE2EDriver = ReturnTypeAsync<typeof appE2EDriver>;
