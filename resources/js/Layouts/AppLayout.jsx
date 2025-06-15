import ThemeSwitcher from '@/Components/Dark/ThemeSwitcher';
import { Avatar, AvatarFallback } from '@/Components/ui/avatar';
import { Toaster } from '@/Components/ui/sonner';
import { Dialog, Transition } from '@headlessui/react';
import { Head, Link, usePage } from '@inertiajs/react';
import { IconLayoutSidebar, IconX } from '@tabler/icons-react';
import { Fragment, useState } from 'react';
import Sidebar from './Partials/Sidebar';

export default function AppLayout({ title, children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const auth = usePage().props.auth.user;
    const { url } = usePage();

    return (
        <>
            <Head title={title} />
            <Toaster position="top-center" richColors />
            <div>
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-900/80" />
                        </Transition.Child>

                        <div className="fixed inset-0 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative mr-16 flex w-full max-w-sm flex-1">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="transition ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="justify-centar absolute right-0 top-0 flex w-16 pt-5">
                                            <button
                                                type="button"
                                                className="-m-2.5 p-2.5"
                                                onClick={() => setSidebarOpen(false)}
                                            ></button>
                                            <button>
                                                <IconX className="size-6 text-white" />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2 dark:bg-background">
                                        {/*sidebar */}
                                        <Sidebar auth={auth} url={url} />
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-slate-50 px-4 dark:border-r dark:border-slate-700 dark:border-r-card dark:bg-background">
                        {/*sidebar */}
                        <Sidebar auth={auth} url={url} />
                    </div>
                </div>

                <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white p-4 shadow-sm dark:bg-background sm:px-6 lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <IconLayoutSidebar className="size-6" />
                    </button>

                    <div className="flex-1 text-sm font-semibold leading-6 text-foreground">{title}</div>

                    <Link href="#">
                        <Avatar>
                            <AvatarFallback>X</AvatarFallback>
                        </Avatar>
                    </Link>
                </div>

                <main className="py-4 dark:bg-background lg:pl-72">
                    <div className="px-4">{children}</div>

                    <div className="fixed bottom-5 end-5 flex w-full justify-center lg:justify-end">
                        <ThemeSwitcher />
                    </div>
                </main>
            </div>
        </>
    );
}
