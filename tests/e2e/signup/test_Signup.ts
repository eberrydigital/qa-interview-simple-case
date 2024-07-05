import { test } from '../../helpers/fixtures'

test.describe('signup form tests', () => {
  test('should be able to register user and login on signup @signup @regression', async ({
    page,
    expect,
    login,
    signup,
    logout,
  }) => {
    await login.gotoUrl('/signup')
    await expect(
      page.getByRole('heading', { name: 'Become a member' }),
    ).toBeVisible()

    const testdata = {
      firstname: 'Test4',
      lastname: 'Testsson4',
      email: 'test4@mail.com',
      password: 'testPassword!',
    }
    await signup.register(testdata)

    await expect(
      page.getByRole('heading', { name: 'Company', level: 1 }),
    ).toBeVisible()
    await expect(
      page.getByText(`Welcome ${testdata.firstname} ${testdata.lastname}`),
    ).toBeVisible()

    await logout.logout()
  })

  test('should not be able to register user @signup @regression', async ({
    page,
    expect,
    login,
    signup,
    logout,
  }) => {
    await login.gotoUrl('/signup')
    await expect(
      page.getByRole('heading', { name: 'Become a member' }),
    ).toBeVisible()

    const testdata = {
      firstname: 'Test5',
      lastname: 'Testsson5',
      password: 'testPassword!',
    }
    await signup.fillRegistration({ user: testdata })
    await expect(page.getByTestId('register-user')).toBeDisabled()
  })

  /* Screenshot testing we will do only for stand-alone pages.  */
  test('checks the fonts, padding, spacing  @signup @regression', async ({
    page,
    expect,
    login,
    snapshot,
  }) => {
    await login.gotoUrl('/signup')
    await expect(
      page.getByRole('heading', { name: 'Become a member' }),
    ).toBeVisible()

    await snapshot.expectToMatchScreenshot('.signup', 'signup')
  })

  test('should contains labels @smoke @signup', async ({ page, expect, login }) => {
    await login.gotoUrl('/signup')
    await expect(
      page.getByRole('heading', { name: 'Become a member' }),
    ).toBeVisible()
    await expect(await page.locator('form label').allTextContents()).toEqual([
      'First name *',
      'Last name *',
      'Email *',
      'Password',
    ])
  })
})
