package com.talentcloud.profile.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RejectClientDto {

    @NotBlank(message = "Rejection reason is required")
    private String rejectionReason;
}