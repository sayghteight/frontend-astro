export const $ = (selector: string, context: Document | HTMLElement = document) => 
    context.querySelector(selector) as HTMLElement