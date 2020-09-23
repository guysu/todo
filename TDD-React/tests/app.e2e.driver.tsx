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
        isSingleTodoListExists: async () => {
            return (
                (await page.$$eval(`[data-hook="task-title"]`, (res) => res.length)) === 1
            );
        },
        isCheckboxExists: async () => {
            return (await page.$$eval(`[data-hook="checkbox"]`, (res) => res.length)) > 0;
        },
        isDeleteBtnExists: async () => {
            return (
                (await page.$$eval(`[data-hook="delete-btn"]`, (res) => res.length)) > 0
            );
        },
        isEditBtnExists: async () => {
            return (await page.$$eval(`[data-hook="edit-btn"]`, (res) => res.length)) > 0;
        },
        addTask: async (title: string) => {
            await page.click(`[data-hook="add-task-input"]`);
            await page.type(`[data-hook="add-task-input"]`, title);
            await page.click(`[data-hook="add-task-btn"]`);
        },
        getFirstTaskTitle: async () => {
            return await page.$eval(`[data-hook="task-title"]`, (res) => res.textContent);
        },
    };
};

export type AppE2EDriver = ReturnTypeAsync<typeof appE2EDriver>;
