import { test, expect } from '@playwright/test';
import { TasksPage } from '../support/pages/tasks';

let tasksPage: TasksPage

test.beforeEach(async ({ page }) => {
    tasksPage = new TasksPage(page)
    await tasksPage.go()
})

test('Validar que página inicial deve exibir notícias', async () => {
    await tasksPage.deveExibirNoticias()
});

test('Validar que notícia possui título', async () => {
    await tasksPage.noticiaPossuiTitutlo()
});

test('Validar que notícia possui imagem', async () => {
    await tasksPage.noticiaPossuiImg()
});

test('Validar que ao abrir a notícia deve ser exibido a matéria completa', async () => {
    await tasksPage.materiaCompleta()
});

test('Validar exibição de página do clube quando selecionado', async () => {
    await tasksPage.acessarTimes()
});