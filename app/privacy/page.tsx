import Link from 'next/link'

export default function Page() {
  return (
    <div className='container mx-auto max-w-3xl'>
      <div className='space-y-6'>
        <h1 className='title text-3xl font-bold tracking-tight text-foreground'>
          Privacy Policy
        </h1>
        <p className='text-muted-foreground'>
          We are committed to protecting your privacy and safeguarding the
          information you share with us. This privacy policy explains how we
          collect, use, and protect your personal data. By using our services or
          submitting any forms on this website, you consent to the practices
          described here.
        </p>
        <div className='space-y-4'>
          <>
            <h2 className='text-xl font-bold'>Information We Collect</h2>
            <p className='text-muted-foreground'>
              We may collect certain personal information that you provide,
              including your name, email address, and any additional details
              submitted through our forms. Additionally, we may automatically
              gather certain usage data, such as your IP address, browser type,
              and pages visited.
            </p>
          </>
          <>
            <h2 className='text-xl font-bold'>How We Use Your Information</h2>
            <p className='text-muted-foreground'>
              The information collected is used to provide and improve our
              services, communicate with you, and meet any legal requirements.
              By submitting a form, you consent to our use of your information
              as outlined in this policy.
            </p>
          </>
          <>
            <h2 className='text-xl font-bold'>Data Sharing and Protection</h2>
            <p className='text-muted-foreground'>
              We do not sell or rent your personal information to any third
              parties. We employ security measures to protect your data from
              unauthorized access or misuse.
            </p>
          </>
          <>
            <h2 className='text-xl font-bold'>Your Rights</h2>
            <p className='text-muted-foreground'>
              You have the right to access, correct, or delete your personal
              information. You may also choose to opt out of certain data
              processing activities. If you wish to exercise these rights,
              please reach out to us using the contact details below.
            </p>
          </>
          <>
            <h2 className='text-xl font-bold'>Contact Details</h2>
            <p className='text-muted-foreground'>
              If you have any questions or concerns about our privacy policy,
              please contact us at this email address:{' '}
              <a
                href='mailto:shrijalacharya@gmail.com'
                className='text-default text-foreground underline underline-offset-4'
              >
                shrijal.acharya@gmail.com
              </a>{' '}
              or through the contact form.
            </p>
          </>
        </div>
        <div className='text-left'>
          <Link
            href='/contact-me'
            className='inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
            prefetch={false}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}
