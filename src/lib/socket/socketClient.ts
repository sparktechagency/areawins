
import { API_CONFIG, COOKIES } from "@/lib/constants";
import type { LiveMatchUpdate, Notification, OddsUpdate } from "@/types";
import Cookies from "js-cookie";
import { io, Socket } from "socket.io-client";

class SocketClient {
  private socket: Socket | null = null;
  private isConnected: boolean = false;
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;

  /**
   * Initialize socket connection
   */
  connect(): void {
    if (this.socket?.connected) {
      console.log("Socket already connected");
      return;
    }

    const token = Cookies.get(COOKIES.ACCESS_TOKEN);

    this.socket = io(API_CONFIG.WS_URL, {
      auth: {
        token,
      },
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: this.maxReconnectAttempts,
    });

    this.setupEventListeners();
  }

  /**
   * Set up socket event listeners
   */
  private setupEventListeners(): void {
    if (!this.socket) return;

    // Connection events
    this.socket.on("connect", () => {
      console.log("Socket connected:", this.socket?.id);
      this.isConnected = true;
      this.reconnectAttempts = 0;
    });

    this.socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
      this.isConnected = false;
    });

    this.socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      this.reconnectAttempts++;

      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        console.error("Max reconnection attempts reached");
        this.disconnect();
      }
    });

    // Reconnection events
    this.socket.on("reconnect", (attemptNumber) => {
      console.log("Socket reconnected after", attemptNumber, "attempts");
      this.reconnectAttempts = 0;
    });

    this.socket.on("reconnect_attempt", (attemptNumber) => {
      console.log("Reconnection attempt:", attemptNumber);
    });

    this.socket.on("reconnect_failed", () => {
      console.error("Socket reconnection failed");
    });
  }

  /**
   * Subscribe to live match updates
   */
  subscribeToMatchUpdates(
    matchId: string,
    callback: (update: LiveMatchUpdate) => void
  ): void {
    if (!this.socket) {
      console.error("Socket not initialized");
      return;
    }

    // Join match room
    this.socket.emit("subscribe:match", matchId);

    // Listen for match updates
    this.socket.on(`match:${matchId}:update`, callback);
  }

  /**
   * Unsubscribe from live match updates
   */
  unsubscribeFromMatchUpdates(matchId: string): void {
    if (!this.socket) return;

    // Leave match room
    this.socket.emit("unsubscribe:match", matchId);

    // Remove all listeners for this match
    this.socket.off(`match:${matchId}:update`);
  }

  /**
   * Subscribe to odds updates
   */
  subscribeToOddsUpdates(
    matchId: string,
    callback: (update: OddsUpdate) => void
  ): void {
    if (!this.socket) {
      console.error("Socket not initialized");
      return;
    }

    // Join odds room
    this.socket.emit("subscribe:odds", matchId);

    // Listen for odds updates
    this.socket.on(`odds:${matchId}:update`, callback);
  }

  /**
   * Unsubscribe from odds updates
   */
  unsubscribeFromOddsUpdates(matchId: string): void {
    if (!this.socket) return;

    // Leave odds room
    this.socket.emit("unsubscribe:odds", matchId);

    // Remove all listeners for odds
    this.socket.off(`odds:${matchId}:update`);
  }

  /**
   * Subscribe to bet result notifications
   */
  subscribeToBetResults(
    userId: string,
    callback: (result: unknown) => void
  ): void {
    if (!this.socket) {
      console.error("Socket not initialized");
      return;
    }

    // Listen for bet result notifications
    this.socket.on(`user:${userId}:bet-result`, callback);
  }

  /**
   * Unsubscribe from bet result notifications
   */
  unsubscribeFromBetResults(userId: string): void {
    if (!this.socket) return;

    this.socket.off(`user:${userId}:bet-result`);
  }

  /**
   * Subscribe to general notifications
   */
  subscribeToNotifications(
    userId: string,
    callback: (notification: Notification) => void
  ): void {
    if (!this.socket) {
      console.error("Socket not initialized");
      return;
    }

    // Listen for notifications
    this.socket.on(`user:${userId}:notification`, callback);
  }

  /**
   * Unsubscribe from general notifications
   */
  unsubscribeFromNotifications(userId: string): void {
    if (!this.socket) return;

    this.socket.off(`user:${userId}:notification`);
  }

  /**
   * Subscribe to wallet balance updates
   */
  subscribeToWalletUpdates(
    userId: string,
    callback: (balance: number) => void
  ): void {
    if (!this.socket) {
      console.error("Socket not initialized");
      return;
    }

    // Listen for wallet updates
    this.socket.on(`user:${userId}:balance-update`, callback);
  }

  /**
   * Unsubscribe from wallet balance updates
   */
  unsubscribeFromWalletUpdates(userId: string): void {
    if (!this.socket) return;

    this.socket.off(`user:${userId}:balance-update`);
  }

  /**
   * Emit a custom event
   */
  emit<T>(event: string, data?: T): void {
    if (!this.socket) {
      console.error("Socket not initialized");
      return;
    }

    this.socket.emit(event, data);
  }

  /**
   * Listen to a custom event
   */
  on<T>(event: string, callback: (data: T) => void): void {
    if (!this.socket) {
      console.error("Socket not initialized");
      return;
    }

    this.socket.on(event, callback);
  }

  /**
   * Remove listener for a custom event
   */
  off(event: string): void {
    if (!this.socket) return;

    this.socket.off(event);
  }

  /**
   * Disconnect socket
   */
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  /**
   * Check if socket is connected
   */
  getConnectionStatus(): boolean {
    return this.isConnected;
  }
}

// Export singleton instance
export const socketClient = new SocketClient();
