"use client";

import { Alert, Box, Button, Heading, Input, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useState, useEffect} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { apiLogin } from "@/app/lib/api";
import { useAuth } from "@/app/contexts/AuthContext";

export default function Login() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [registered, setRegistered] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    
    const router = useRouter();

    const {isAuthenticated, login} = useAuth();

    const searchParams = useSearchParams();

    useEffect(() => {
        if (isAuthenticated) {
            router.push("/");
        };

        if (searchParams.get("registered") === "true") {
            setRegistered(true);
        };
    }, [isAuthenticated, router, searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const token = await apiLogin(username, password);
            login(token);
            router.push("/");
        } catch (error: any) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack gap={6}>
                <Alert.Root status="success" size="lg" p={4} mb={4} hidden={!registered}>
                    <Alert.Indicator />
                    <Alert.Title>Registration successful! Please log in.</Alert.Title>
                </Alert.Root>

                <Box textAlign="center">
                    <Heading size="2xl" mb={2}>Login</Heading>
                </Box>

                <Stack gap={4}>
                    <Input placeholder="Username" type="text" size="lg" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <Input placeholder="Password" type="password" size="lg" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                
                    <Alert.Root status="error" size="lg" p={4} hidden={!error}>
                        <Alert.Indicator />
                        <Alert.Title>{error}</Alert.Title>
                    </Alert.Root>
                
                    <Button colorPalette="blue" size="lg" width="full" type="submit" loading={isLoading}>Log In</Button>
                </Stack>

                <Text textAlign="center" fontSize="sm" color="fg.muted">
                    Don't have an account?{" "}
                    <Link href="/auth/register">
                        <Button variant="plain" colorPalette="blue" size="sm">
                            Sign up
                        </Button>
                    </Link>
                </Text>
            </Stack>
        </form>
    );
}