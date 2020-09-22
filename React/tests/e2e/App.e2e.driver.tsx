import puppeteer from "puppeteer";
import { ReturnTypeAsync } from "../../../common/types";

export const appE2EDriver = async () => {
    let browser: puppeteer.Browser, page: puppeteer.Page;

    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto("http://localhost:3232");

    return {
        close: async () => browser.close(),
        addTask: async (title: string) => {
            await page.click(".add-task-input");
            await page.type(".add-task-input", title);
            await page.click(".add-task-btn");
        },
        waitForChangesToApply: async () => {
            return await page.waitForSelector(`[data-hook="task-title"]`);
        },
        getFirstTaskTitle: async () => {
            try {
                return await page.$eval(
                    `[data-hook="task-title"]`,
                    (res) => res.textContent
                );
            } catch {
                return null;
            }
        },
        deleteFirstTask: async () => {
            await page.click(".delete-btn");
        },
        countTasksNum: async () => {
            return await page.$$eval(`[data-hook="task-title"]`, (res) => res.length);
        },
    };
};

export type AppE2EDriver = ReturnTypeAsync<typeof appE2EDriver>;
