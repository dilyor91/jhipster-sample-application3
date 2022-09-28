package uz.tashkec.service.impl;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.tashkec.domain.Logo;
import uz.tashkec.repository.LogoRepository;
import uz.tashkec.service.LogoService;
import uz.tashkec.service.dto.LogoDTO;
import uz.tashkec.service.mapper.LogoMapper;

/**
 * Service Implementation for managing {@link Logo}.
 */
@Service
@Transactional
public class LogoServiceImpl implements LogoService {

    private final Logger log = LoggerFactory.getLogger(LogoServiceImpl.class);

    private final LogoRepository logoRepository;

    private final LogoMapper logoMapper;

    public LogoServiceImpl(LogoRepository logoRepository, LogoMapper logoMapper) {
        this.logoRepository = logoRepository;
        this.logoMapper = logoMapper;
    }

    @Override
    public LogoDTO save(LogoDTO logoDTO) {
        log.debug("Request to save Logo : {}", logoDTO);
        Logo logo = logoMapper.toEntity(logoDTO);
        logo = logoRepository.save(logo);
        return logoMapper.toDto(logo);
    }

    @Override
    public LogoDTO update(LogoDTO logoDTO) {
        log.debug("Request to update Logo : {}", logoDTO);
        Logo logo = logoMapper.toEntity(logoDTO);
        logo = logoRepository.save(logo);
        return logoMapper.toDto(logo);
    }

    @Override
    public Optional<LogoDTO> partialUpdate(LogoDTO logoDTO) {
        log.debug("Request to partially update Logo : {}", logoDTO);

        return logoRepository
            .findById(logoDTO.getId())
            .map(existingLogo -> {
                logoMapper.partialUpdate(existingLogo, logoDTO);

                return existingLogo;
            })
            .map(logoRepository::save)
            .map(logoMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<LogoDTO> findAll() {
        log.debug("Request to get all Logos");
        return logoRepository.findAll().stream().map(logoMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<LogoDTO> findOne(Long id) {
        log.debug("Request to get Logo : {}", id);
        return logoRepository.findById(id).map(logoMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Logo : {}", id);
        logoRepository.deleteById(id);
    }
}
