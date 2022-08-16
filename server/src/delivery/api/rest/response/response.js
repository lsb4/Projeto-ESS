class SuccessResponse {
    success(res, body) {
        return res.status(200).json(body)
    }
}

class InternalServerErrorResponse {
    internalServerError(res, error) {
        return res.status(500).send(error)
    }
}

export {
    SuccessResponse,
    InternalServerErrorResponse
}