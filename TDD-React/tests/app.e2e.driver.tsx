import puppeteer from "puppeteer";
import { ReturnTypeAsync } from "../../common/types";

export const appE2EDriver = async () => {
    let browser = await puppeteer.launch();
    let page = await browser.newPage();
    await page.goto("http://localhost:3232");

    return {
        close: async () => {
            browser.close();
        },
        getTitleText: async () => {
            return await page.$eval(`[data-hook="Header"]`, (res) => res.textContent);
        },
        addTask: async (title: string) => {
            await page.type(`[data-hook="add-task-input"]`, title);
            await page.click(`[data-hook="add-task-btn"]`);
        },
        waitForChangesToApply: async () => {
            await (page as any).waitForTimeout(50);
        },
        getFirstTaskTitle: async () => {
            return await page.$eval(`[data-hook="task-title"]`, (res) => res.textContent);
        },
        getTasksNum: async () => {
            return await page.$$eval(`[data-hook="task-title"]`, (res) => res.length);
        },
        deleteFirstTask: async () => {
            await page.click(`[data-hook="delete-btn"]`);
        },
        checkFirstTask: async () => {
            await page.click(`[data-hook="checkbox"]`);
        },
        isFirstTaskChecked: async () => {
            return (await page.$$eval(".finished-task", (res) => res.length)) === 1;
        },
        editFirstTask: async (title: string) => {
            await page.click(`[data-hook="edit-btn"]`);
            await page.$eval(
                `[data-hook="edit-input"]`,
                (res) => ((res as HTMLInputElement).value = "")
            );
            await page.type(`[data-hook="edit-input"]`, title);
            await page.click(`[data-hook="save-btn"]`);
        },
    };
};

export type AppE2EDriver = ReturnTypeAsync<typeof appE2EDriver>;
