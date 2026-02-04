"use client";

import { Box, Button, Flex, Heading, Spacer } from "@chakra-ui/react";
import Link from "next/link";
import { ReactNode } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import { Toaster } from "@/app/components/ui/toaster";

export default function DashboardLayout({ children }: { children: ReactNode }) {
	const { logout } = useAuth();

	return (
		<Box minH="100vh">
			<Flex as="nav" px={8} py={4} align="center" borderBottomWidth="1px">
                <Heading size="3xl">Expensify</Heading>
				<Spacer />
				<Link href="/">
					<Button size="lg" px={4} variant="ghost">
						<b>Home</b>
					</Button>
				</Link>
				<Link href="/accounts">
					<Button size="lg" px={4} variant="ghost">
						<b>Accounts</b>
					</Button>
				</Link>
				<Link href="/incomes">
					<Button size="lg" px={4} variant="ghost">
						<b>Incomes</b>
					</Button>
				</Link>
                <Link href="/expenses">
					<Button size="lg" px={4} variant="ghost">
						<b>Expenses</b>
					</Button>
				</Link>
                <Link href="/transfers">
					<Button size="lg" px={4} variant="ghost">
						<b>Transfers</b>
					</Button>
				</Link>
				<Spacer />
				<Button px={4} variant="outline" onClick={logout}>
					Logout
				</Button>
			</Flex>

			<Box
				p={8}
				flex="1"
				display="flex"
				alignItems="center"
				justifyContent="center"
				textAlign="center"
			>
				{children}
			</Box>

            <Toaster />
		</Box>
	);
}
