import { test } from '../../helpers/fixtures'

test.describe('login form tests', () => {
  test('should be able to naviagte to signup from login page @login @regression', async ({
    page,
    expect,
    login,
  }) => {
    await login.gotoUrl('/login')
    await page.click(login.locators.SIGNUP)
    await expect(
      page.getByRole('heading', { name: 'Strawberry QA', level: 1 }),
    ).toBeVisible()
    await expect(
      page.getByRole('heading', { name: 'Become a member', level: 2 }),
    ).toBeVisible()
  })

  test('should be able to login into app @login @regression', async ({
    page,
    expect,
    login,
  }) => {
    const user = {
      email: 'test1@mail.com',
      password: 'testPassword!',
      firstName: 'Test1',
      lastName: 'Testsson1',
    }
    await login.login('/login', user)
    await expect(page.getByText('Log out')).toBeVisible()
  })

  const testdata = [
    {
      title: 'Should see login button disabled',
      email: 'admin5day.io',
      password: 'testPassword!',
      validation: 'Button-Disabled',
    },
    {
      title: 'Should see invalid credencials validation message',
      email: 'test3@mail.com',
      password: '@notAValidPwd123',
      validation: 'Error-Message',
    },
    {
      title: 'Should see login button disabled on empty email',
      email: '',
      password: 'testPassword!',
      validation: 'Button-Disabled',
    },
  ]
  for (const user of testdata) {
    test(`${user.title} @login @regression`, async ({
      page,
      expect,
      login,
    }) => {
      await login.gotoUrl('/login')

      if (user.validation === 'Button-Disabled') {
        await login.fillLogin(user.email, user.password)
        await expect(page.locator(login.locators.SUBMIT), {
          message: user.title,
        }).toBeDisabled()
      } else {
        await login.login('/login', user)
        await expect(page.getByText(/invalid credentials/i), {
          message: user.title,
        }).toBeVisible()
      }
    })
  }

  test('should contains labels @smoke @login', async ({
    page,
    expect,
    login,
  }) => {
    await login.gotoUrl('/login')
    await expect(await page.locator('form label').allTextContents()).toEqual([
      'Email *',
      'Password',
    ])
  })
})
