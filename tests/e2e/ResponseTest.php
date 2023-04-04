<?php

namespace Utopia\Tests;

use PHPUnit\Framework\TestCase;
use Tests\E2E\Client;

class ResponseTest extends TestCase
{
    public function setUp(): void
    {
        $this->client = new Client();
    }

    public function tearDown(): void
    {
        $this->client = null;
    }

    /**
     * @var Client
     */
    protected $client;

    public function testResponse()
    {
        $response = $this->client->call(Client::METHOD_GET, '/');
        $this->assertEquals('Hello World!', $response['body']);
    }

    public function testResponseValue()
    {
        $response = $this->client->call(Client::METHOD_GET, '/value/123');
        $this->assertEquals('123', $response['body']);
    }

    public function testChunkResponse()
    {
        $response = $this->client->call(Client::METHOD_GET, '/chunked');
        $this->assertEquals('Hello World!', $response['body']);
    }

    public function testRedirect()
    {
        $response = $this->client->call(Client::METHOD_GET, '/redirect');
        $this->assertEquals('Hello World!', $response['body']);
    }
}
