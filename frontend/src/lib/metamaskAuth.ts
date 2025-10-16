import { BrowserProvider } from 'ethers';

export interface MetaMaskAccount {
  address: string;
  provider: BrowserProvider;
}

let metamaskAccount: MetaMaskAccount | null = null;

export async function connectMetaMask(): Promise<MetaMaskAccount> {
  if (typeof window === 'undefined') {
    throw new Error('MetaMask can only be used in the browser');
  }

  if (!(window as any).ethereum) {
    throw new Error('MetaMask is not installed. Please install MetaMask extension.');
  }

  try {
    const provider = new BrowserProvider((window as any).ethereum);
    
    const accounts = await provider.send('eth_requestAccounts', []);
    
    if (!accounts || accounts.length === 0) {
      throw new Error('No accounts found. Please unlock MetaMask.');
    }

    metamaskAccount = {
      address: accounts[0],
      provider
    };

    localStorage.setItem('metamask_connected', 'true');
    localStorage.setItem('metamask_address', accounts[0]);

    return metamaskAccount;
  } catch (error: any) {
    console.error('MetaMask connection error:', error);
    throw new Error(error.message || 'Failed to connect to MetaMask');
  }
}

export function getMetaMaskAccount(): MetaMaskAccount | null {
  return metamaskAccount;
}

export function isMetaMaskConnected(): boolean {
  return localStorage.getItem('metamask_connected') === 'true';
}

export function getMetaMaskAddress(): string | null {
  return localStorage.getItem('metamask_address');
}

export function disconnectMetaMask(): void {
  metamaskAccount = null;
  localStorage.removeItem('metamask_connected');
  localStorage.removeItem('metamask_address');
}

export function isMetaMaskInstalled(): boolean {
  return typeof window !== 'undefined' && !!(window as any).ethereum;
}
