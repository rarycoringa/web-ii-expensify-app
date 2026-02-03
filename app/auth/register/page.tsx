"use client";

import { Alert, Box, Button, Heading, Input, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiRegister } from "@/app/lib/api";
import { useAuth } from "@/app/contexts/AuthContext";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const router = useRouter();

    const {isAuthenticated} = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            router.push("/");
        };
    }, [isAuthenticated, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        
        setIsLoading(true);
        setError(null);

        try {
            await apiRegister(username, password);
            router.push("/auth/login?registered=true");
        } catch (error: any) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
        
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack gap={6}>
                <Box textAlign="center">
                    <Heading size="2xl" mb={2}>Register</Heading>
                </Box>

                <Stack gap={4}>
                    <Input placeholder="Username" type="text" size="lg" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <Input placeholder="Password" type="password" size="lg" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <Input placeholder="Confirm Password" type="password" size="lg" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    
                    <Alert.Root status="error" size="lg" p={4} hidden={!error}>
                        <Alert.Indicator />
                        <Alert.Title>{error}</Alert.Title>
                    </Alert.Root>

                    <Button colorPalette="blue" size="lg" width="full" type="submit" loading={isLoading}>Sign Up</Button>
                </Stack>

                <Text textAlign="center" fontSize="sm" color="fg.muted">
                    Already have an account?{" "}
                    <Link href="/auth/login">
                        <Button variant="plain" colorPalette="blue" size="sm">
                            Log in
                        </Button>
                    </Link>
                </Text>
            </Stack>
        </form>
    );
}